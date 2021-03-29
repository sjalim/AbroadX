const mysql = require("mysql");
const _ = require("lodash");
const path = require('path');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
/**--------------------User-End AboutUS---------------------**/
// Show about us
exports.showAboutUs = (req, res) => {
    db.query('SELECT * FROM about_us', async (err, rows) => {
        if(!err) {
            // console.log(rows[0].description)
            res.render('about_us', {
                aboutUs: rows[0],
                user: req.user
            })
        } else {
            console.log(err)
        }
    })
}

/**--------------------Admin AboutUS---------------------**/
// Edit about us
exports.editAboutUs = (req, res) => {
    let labelMsg = '';

    if(req.method === "POST"){
        const description = req.body.description;

        if(!description) {
            labelMsg = "Give a description";
            res.render('edit_aboutUs.ejs',{
                labelWarning: labelMsg,
                message: req.flash('message'),
                aboutUs: {
                    description: description,
                    aboutUsImage: ''
                }
            });
        } else {
            if (req.files) {
                const imageFile = req.files.uploaded_image;
                const img_name = imageFile.name;

                var ext = path.extname(img_name)
                var customImgName = _.kebabCase(`about us`)+ext;

                if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' ||
                    ext === '.PNG' || ext === '.JPG' || ext === '.JPEG') {
                    console.log(img_name)
                    imageFile.mv('public/img/about_us/'+ customImgName, function(err) {
                        if (err)
                            return res.status(500).send(err);

                        db.query(`UPDATE about_us SET description=?, aboutUsImage=?`,
                            [description,customImgName],function(err, result) {
                                req.flash('message', 'Updated successfully');
                                res.redirect('/admin/edit_aboutUs');
                            });
                    });
                } else {
                    labelMsg = "This format is not allowed , please upload file with '.png','.jpg'";
                    res.render('edit_aboutUs.ejs',{
                        labelWarning: labelMsg,
                        message: req.flash('message'),
                        aboutUs: {
                            description: description,
                            aboutUsImage: customImgName
                        }
                    });
                }
            } else {
                db.query(`UPDATE about_us SET description=?`,
                    [description],function(err, result) {
                        req.flash('message', 'Updated successfully');
                        res.redirect('/admin/edit_aboutUs');
                    });
            }
        }
    } else {
        db.query('SELECT * FROM about_us',async (err, rows) => {
            if(!err) {
                res.render(`edit_aboutUs`, {
                    aboutUs: rows[0],
                    labelWarning: labelMsg,
                    message: req.flash('message')
                })
            } else {
                console.log(err)
            }
        })
    }
}