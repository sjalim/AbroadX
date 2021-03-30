const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require("multer");
const {promisify} = require('util');
const fs = require("fs");
const streamToBlob = require('stream-to-blob')


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


exports.uniListAppend = async (req, res) => {
    let uniPhoto;
    let uploadPath;
    try {
        const {uni_name, uni_web} = req.body;
        uniPhoto = req.files.uni_photo_file;
        // console.log(uni_name, +" " + uni_web);
        uploadPath = 'public/uni_img_upload/' + uniPhoto.name;
       let finalPath = '/uni_img_upload/' + uniPhoto.name;
        // Use mv() to place file on the server
        await uniPhoto.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);

            db.query('insert into university_list set ?', {
                name: uni_name,
                website: uni_web,
                photo: finalPath
            }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    return res.render('otherAddition.hbs', {
                        message: 'University Added to database'
                    });
                }
            });
            });
        } catch (e) {
        console.log(e);
    }

};

exports.areaAppend = async (req, res) => {

    let area = req.body.area;

    console.log(area);

    try {


        if (area !== null) {
            console.log("at query");
            db.query('insert into area_list set ?', {
                name: area

            }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    return res.render('otherAddition.hbs', {
                        message: 'Area Added to database'
                    });
                }
            });
        } else {
            return res.render('otherAddition.hbs', {
                message: 'Area not Added to database'
            });
        }

    } catch (e) {
        console.log(e);
    }

};
