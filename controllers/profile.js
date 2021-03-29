

const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const path = require('path');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


exports.profileUpdate = async (req,res,next) => {
    // console.log("chek");
    try{
       const {name, email, countryCode, phone} = req.body;

        if (req.cookies.jwt) {
            try {

                //verify the cookies
                const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);

                db.query('select * from users where id = ?', [decoded.id], (error, result) => {

                    console.log(result);
                    if (!result) {
                        return next();
                    }
                    var sql = `UPDATE users SET name="${name}", country_code="${countryCode}", email="${email}",phone=${phone} WHERE id=${result[0].id}`;

                    db.query(sql, function(err, result) {
                        if (err) throw err;
                        console.log('record updated!');
                        res.redirect('/profile');
                    });
                });
            } catch (error) {

                console.log(error);
                res.redirect('/profile');//pop up here

            }
        } else {

            next();
        }
    }catch (e)
    {
        console.log(e);
    }
    // req.end();

};

exports.uploadProfilePic = async (req,res,next)=>{

    let proPic;
    let proPicPath;

    let  id = req.params.id;
    proPic = req.files.profile_pic;

    var ext = path.extname(proPic.name);
    console.log("user id:"+id);
    try{

        proPicPath = 'public/user_profile_pic/' + id+ext;
        let  pic = id+ext;

        await proPic.mv(proPicPath, function (err) {
            if (err) return res.status(500).send(err);
            db.query('update users set ?', {
                photo: pic
            }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    return next();
                }
            });
        });
    }catch (e)
    {
        console.log(e);
    }
};

