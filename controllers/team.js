const mysql = require("mysql");
const bodyParser = require("body-parser");
const _ = require("lodash");
const path = require('path');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

/**--------------------User-End Team---------------------**/
exports.showTeamMembers = (req, res) => {
    /*Showing all members*/
    db.query('SELECT * FROM team_members', async (err, rows) => {
        if(!err) {
            res.render('team', {
                listOfMembers: rows,
                user: req.user
            })
        } else {
            console.log(err)
        }
    })
}

/**--------------------Team ADMIN---------------------**/

// Show members
exports.showMembers = (req, res) => {
    db.query('SELECT * FROM team_members', async (err, rows) => {
        if(!err) {
            res.render(`team_admin`, {
                listOfMembers: rows,
                message: req.flash('message')
            })
        } else {
            console.log(err)
        }
    })
}

// Add members
exports.addMembers = (req, res) => {
    var labelMsg = '';

    if(req.method === "POST") {
        const memberName = req.body.memberName;
        const memberDesignation = req.body.memberDesignation;
        const fbId = req.body.fbId;
        const githubId = req.body.githubId;
        const linkedinId = req.body.linkedinId;

        if(!memberName || !memberDesignation || !fbId
            || !githubId ||!linkedinId) {
            labelMsg = "Fill all the fields!";
            res.render('add_team.ejs',{
                labelWarning: labelMsg
            });
        } else {
            if (!req.files)
                return res.status(400).send('No images were uploaded.');

            const imageFile = req.files.uploaded_image;
            const img_name = imageFile.name;

            var ext = path.extname(img_name)
            var customImgName = _.kebabCase(memberName)+ext;

            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg'
                || ext === '.PNG' || ext === '.JPG' || ext === '.JPEG') {
                console.log(img_name)
                imageFile.mv('public/img/team/'+ customImgName, function(err) {
                    if (err)
                        return res.status(500).send(err);
                    const sql = "INSERT INTO `team_members`(`memberName`,`memberDesignation`,`fbId`,`githubId`,`linkedinId`,`memberImage`) " +
                        "VALUES ('" + memberName + "','" + memberDesignation + "','" + fbId+ "','"
                            + githubId+ "','" + linkedinId+ "','" + customImgName+ "')";
                    db.query(sql, function(err, result) {
                        req.flash('message', 'Member added successfully');
                        res.redirect('/admin/team_admin');
                    });
                });
            } else {
                labelMsg = "This format is not allowed , please upload file with '.png','.jpg'";
                res.render('add_team.ejs',{
                    labelWarning: labelMsg
                });
            }
        }
    } else {
        res.render('add_team.ejs', {
            labelWarning: labelMsg
        });
    }
}

// Edit members
exports.editMembers = (req, res) => {
    let labelMsg = '';

    if(req.method === "POST"){
        const memberName = req.body.memberName;
        const memberDesignation = req.body.memberDesignation;
        const fbId = req.body.fbId;
        const githubId = req.body.githubId;
        const linkedinId = req.body.linkedinId;

        if(!memberName || !memberDesignation || !fbId
            || !githubId ||!linkedinId) {
            labelMsg = "Fill all the fields!";
            res.render('edit_team.ejs',{
                labelWarning: labelMsg
            });
        } else {
            if (req.files) {
                const imageFile = req.files.uploaded_image;
                const img_name = imageFile.name;

                var ext = path.extname(img_name)
                var customImgName = _.kebabCase(memberName)+ext;

                if(ext === '.png' || ext === '.jpg' || ext === '.jpeg'
                    || ext === '.PNG' || ext === '.JPG' || ext === '.JPEG') {
                    console.log(img_name)
                    imageFile.mv('public/img/team/'+ customImgName, function(err) {
                        if (err)
                            return res.status(500).send(err);

                        db.query(`UPDATE team_members SET memberName=?, memberDesignation=?, fbId=?, 
                                githubId=?, linkedinId=?, memberImage=? WHERE memberId=?`,
                            [memberName,memberDesignation,fbId,githubId,linkedinId,customImgName,req.params.id],function(err, result) {
                                req.flash('message', 'Member edited successfully');
                                res.redirect('/admin/team_admin');
                            });
                    });
                } else {
                    labelMsg = "This format is not allowed , please upload file with '.png','.jpg'";
                    res.render('edit_team.ejs',{
                        labelWarning: labelMsg
                    });
                }
            } else {
                db.query(`UPDATE team_members SET memberName=?, memberDesignation=?, fbId=?, 
                                githubId=?, linkedinId=? WHERE memberId=?`,
                    [memberName,memberDesignation,fbId,githubId,linkedinId,req.params.id],function(err, result) {
                        req.flash('message', 'Member edited successfully');
                        res.redirect('/admin/team_admin');
                    });
            }
        }

    } else {
        db.query('SELECT * FROM team_members WHERE memberId = ?', [req.params.id],async (err, rows) => {
            if(!err) {
                res.render(`edit_team`, {
                    member: rows[0],
                    labelWarning: labelMsg
                })
            } else {
                console.log(err)
            }
        })
    }
}

// Delete members
exports.deleteMembers = async (req, res) => {
    db.query('DELETE FROM team_members WHERE memberId = ?', [req.params.id], async (err, rows) => {
        if(!err) {
            req.flash('message', 'Member deleted successfully');
            res.redirect('/admin/team_admin');
        } else {
            console.log(err)
        }
    })
}