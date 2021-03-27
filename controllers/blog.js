const mysql = require("mysql");
const bodyParser = require("body-parser");
const _ = require("lodash");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

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
            // console.log(rows[0].blogTitle)
            res.render(`blog_details`, {
                blog: rows[0],
                user: req.user
            })
        } else {
            console.log(err)
        }
    })
}

//Search Blogs by Title
// exports.searchBlog = (req, res) => {
//     const searchTerm = req.body.search;
//     console.log(searchTerm);
//     db.query('SELECT * FROM blogs WHERE blogTitle LIKE ?', ['%' + searchTerm + '%'], async (err, rows) => {
//         if(!err) {
//             console.log(rows.blogTitle);
//             res.render('blog', {
//                 listOfBlogs: rows,
//                 user: req.user
//             })
//         } else {
//             console.log(err)
//         }
//     })
// }

//Delete blog
// exports.deleteBlogById = async (req, res) => {
//
//     console.log("From deleteBlogById");
//     db.query('DELETE FROM blogs WHERE blogId = ?', [req.params.id], async (err, rows) => {
//
//         if(!err) {
//             res.send(`Blog with Id: ${req.params.id} has been deleted`);
//         } else {
//             console.log(err)
//         }
//     })
// }

// Insert Blog
// exports.insertBlog = async (req, res) => {
//     console.log("From insertBlog");
//     const params = req.body
//     db.query('INSERT INTO blogs SET ?', params, async (err, rows) => {
//
//         if(!err) {
//             res.send(rows)
//         } else {
//             console.log(err)
//         }
//     })
// }

// Update Blog
// exports.insertBlog = async (req, res) => {
//     console.log("From insertBlog");
//     const {blogTitle, blogDes, blogImage} = req.body
//     db.query('UPDATE INTO blogs SET ?', params, async (err, rows) => {
//
//         if(!err) {
//             res.send(rows)
//         } else {
//             console.log(err)
//         }
//     })
// }