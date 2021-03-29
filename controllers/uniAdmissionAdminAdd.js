const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


exports.admissionRecordStore = async (req, res) => {

    try {
        const {level,subject,area,university,post,date,formal_prereq,tuition_fee,degree_level
            ,city,credit,language
        }= req.body;

        console.log(req.body);

        if(level!==null &&subject!==null && area!== null && university!== null && post!==null && date!==null && formal_prereq!==null && tuition_fee!==null && degree_level!==null
        && city!==null && credit!== null,language!==null){

            if(level==='0')
            {
                db.query('insert into bachelor set ?',{
                    subject:subject,
                    area:area,
                    university:university,
                    post:post,
                    application_deadline:date,
                    formal_prereq:formal_prereq,
                    tuition_fee:tuition_fee,
                    degree_level:degree_level,
                    city:city,
                    credit:credit,
                    language:language


                }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        // req.session.valid = 'Record Added to database';
                    }
                });
            }
            else if(level==="1")
            {
                db.query('insert into master set ?',{
                    subject:subject,
                    area:area,
                    university:university,
                    post:post,
                    application_deadline:date,
                    formal_prereq:formal_prereq,
                    tuition_fee:tuition_fee,
                    degree_level:degree_level,
                    city:city,
                    credit:credit,
                    language:language


                }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        return res.render('uniAdmissionAdminAdd.hbs', {
                            message: 'Record Added to database'
                        });
                    }
                });
            }
            else if(level==="2"){
                db.query('insert into phd set ?',{
                    subject:subject,
                    area:area,
                    university:university,
                    post:post,
                    application_deadline:date,
                    formal_prereq:formal_prereq,
                    tuition_fee:tuition_fee,
                    degree_level:degree_level,
                    city:city,
                    credit:credit,
                    language:language


                }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        return res.render('uniAdmissionAdminAdd.hbs', {
                            message: 'Record Added to database'
                        });
                    }
                });
            }
            else
            {
                return res.render('uniAdmissionAdminAdd.hbs', {
                    message: 'error occurred!'
                });
            }


        }



    } catch (e) {
        console.log(e);
    }

};
exports.getUniList = async (req, res, next) => {

    db.query('select id, name from university_list', async (error, results) => {

        // console.log(results);
        if (!results) {
            return next();
        }

        req.results = results;
        return next();
    });


};

exports.getAreaList = async (req,res,next) =>{

  db.query('select id, name from area_list',async (error,results)=>{
      console.log("areas");
      // console.log(results);
      if(!results)
      {
          return next();
      }
      req.areaResults = results;
      return next();
  });

};