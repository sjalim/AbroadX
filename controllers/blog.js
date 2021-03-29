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
/**--------------------BLOG USER---------------------**/
exports.showBlogs = (req, res) => {
    const searchTerm = req.body.search;
    let message = "";
    /*Showing searched blogs*/
    if(searchTerm) {
        db.query('SELECT * FROM blogs WHERE blogTitle LIKE ?', ['%' + searchTerm + '%'], async (err, rows) => {
            if(!err) {
                /*Checking if Object is empty or not*/
                if(_.isEmpty(rows)) {
                    message = "No match found.";
                    res.render('blog', {
                        listOfBlogs: rows,
                        user: req.user,
                        notFound: message
                    })
                } else {
                    res.render('blog', {
                        listOfBlogs: rows,
                        user: req.user,
                        notFound: message
                    })
                }
            } else {
                console.log(err)
            }
        })
    } else {
        /*Showing all blogs*/
        db.query('SELECT * FROM blogs', async (err, rows) => {
            if(!err) {
                res.render('blog', {
                    listOfBlogs: rows,
                    user: req.user,
                    notFound: message
                })
            } else {
                console.log(err)
            }
        })
    }
}

//Show Blog Individually
exports.showBlogById = (req, res) => {
    db.query('SELECT * FROM blogs WHERE blogId = ?', [req.params.id], async (err, rows) => {
        if(!err) {
            console.log(rows[0].blogTitle)
            res.render(`blog_details`, {
                blog: rows[0],
                user: req.user,
                checkAdmin: false
            })
        } else {
            console.log(err)
        }
    })
}

/**--------------------BLOG ADMIN---------------------**/

// Show blogs
exports.showBlogsOnAdmin = (req, res) => {
    db.query('SELECT * FROM blogs', async (err, rows) => {
        if(!err) {
            res.render(`blog_admin`, {
                listOfBlogs: rows,
                message: req.flash('message')
            })
        } else {
            console.log(err)
        }
    })
}

//Show Blogs Individually on Admin
exports.showBlogByIdAdmin = (req, res) => {
    db.query('SELECT * FROM blogs WHERE blogId = ?', [req.params.id], async (err, rows) => {
        if(!err) {
            console.log(rows[0].blogTitle)
            res.render(`blog_details`, {
                blog: rows[0],
                user: req.user,
                checkAdmin: true
            })
        } else {
            console.log(err)
        }
    })
}

// Add blogs
exports.addBlogs = (req, res) => {
    var labelMsg = '';

    if(req.method === "POST"){
        const blogTitle = req.body.title;
        const blogDes = req.body.description;

        if(!blogTitle || !blogDes) {
            labelMsg = "You need to give title and description";
            res.render('add_blog.ejs',{
                labelWarning: labelMsg
            });
        } else {
            if (!req.files)
                return res.status(400).send('No images were uploaded.');

            const imageFile = req.files.uploaded_image;
            const img_name = imageFile.name;

            var ext = path.extname(img_name)
            var customImgName = _.kebabCase(blogTitle)+ext;

            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg'
                || ext === '.PNG' || ext === '.JPG' || ext === '.JPEG') {
                console.log(img_name)
                imageFile.mv('public/img/blogs/'+ customImgName, function(err) {
                    if (err)
                        return res.status(500).send(err);
                    const sql = "INSERT INTO `blogs`(`blogTitle`,`blogDescription`,`blogImage`) " +
                        "VALUES ('" + blogTitle + "','" + blogDes + "','" + customImgName + "')";
                    db.query(sql, function(err, result) {
                        req.flash('message', 'Added successfully');
                        res.redirect('/admin/blog_admin');
                    });
                });
            } else {
                labelMsg = "This format is not allowed , please upload file with '.png','.jpg'";
                res.render('add_blog.ejs',{
                    labelWarning: labelMsg
                });
            }
        }
    } else {
        res.render('add_blog.ejs', {
            labelWarning: labelMsg
        });
    }
}

// Edit blogs
exports.editBlogs = (req, res) => {
    let labelMsg = '';

    if(req.method === "POST"){
        const blogTitle = req.body.title;
        const blogDes = req.body.description;

        if(!blogTitle || !blogDes) {
            labelMsg = "You need to give title and description";
            res.render('edit_blog.ejs',{
                labelWarning: labelMsg
            });
        } else {
            if (req.files) {
                const imageFile = req.files.uploaded_image;
                const img_name = imageFile.name;

                var ext = path.extname(img_name)
                var customImgName = _.kebabCase(blogTitle)+ext;

                if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' ||
                    ext === '.PNG' || ext === '.JPG' || ext === '.JPEG') {
                    console.log(img_name)
                    imageFile.mv('public/img/blogs/'+ customImgName, function(err) {
                        if (err)
                            return res.status(500).send(err);

                        db.query(`UPDATE blogs SET blogTitle=?, blogDescription=?, blogImage=? WHERE blogId=?`,
                            [blogTitle,blogDes,customImgName,req.params.id],function(err, result) {
                            req.flash('message', 'Updated successfully');
                            res.redirect('/admin/blog_admin');
                        });
                    });
                } else {
                    labelMsg = "This format is not allowed , please upload file with '.png','.jpg'";
                    res.render('edit_blog.ejs',{
                        labelWarning: labelMsg
                    });
                }
            } else {
                db.query(`UPDATE blogs SET blogTitle=?, blogDescription=? WHERE blogId=?`,
                    [blogTitle,blogDes,req.params.id],function(err, result) {
                        req.flash('message', 'Updated successfully');
                        res.redirect('/admin/blog_admin');
                    });
            }
        }
    } else {
        db.query('SELECT * FROM blogs WHERE blogId = ?', [req.params.id],async (err, rows) => {
            if(!err) {
                res.render(`edit_blog`, {
                    blog: rows[0],
                    labelWarning: labelMsg
                })
            } else {
                console.log(err)
            }
        })
    }
}

// Delete blog
exports.deleteBlogs = async (req, res) => {
    db.query('DELETE FROM blogs WHERE blogId = ?', [req.params.id], async (err, rows) => {
        if(!err) {
            req.flash('message', 'Deleted successfully');
            res.redirect('/admin/blog_admin');
        } else {
            console.log(err)
        }
    })
}
