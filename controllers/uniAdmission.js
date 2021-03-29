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

exports.searchContent = async (req, res, next) => {

  let level = req.body.level;
  let area = req.body.area;
  let filteredData= [];

    console.log("at search " + level+ " " + area);


    db.query(
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from bachelor ' +
        'union ' +
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from master ' +
        'union ' +
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from phd '
        , async (error, results) => {
        if (error) {
            console.log(error);
        }
        // console.log(results)
        if (!results) {
            return next();
        }

        for(var i =0;i<results.length;i++)
        {
            if(level.trim()===results[i].level.trim() && area.trim()===results[i].area.trim())
            {
                filteredData.push(results[i]);
            }

            // else  if(level.trim()!==results[i].level.trim() && area.trim()===results[i].area.trim()){
            //     filteredData.push(results[i]);
            // }else  if(level.trim()===results[i].level.trim() && area.trim()!==results[i].area.trim())
            // {
            //     filteredData.push(results[i]);
            // }

        }

        console.log("filtered data:"+filteredData.length);
        req.dataRecord = filteredData;
        req.level = level;
        req.area = area;
        return next();
    });
};


exports.selectedContent = async (req,res,next) =>{


    let level = req.params.level;
    let id = req.params.id;

    let selectedData = [];
    let selectedUni;

    console.log(level + " " + id + "selected content");



    db.query(
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from bachelor ' +
        'union ' +
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from master ' +
        'union ' +
        'select subject_id,level,subject,area,university,post,' +
        'application_deadline,formal_prereq, tuition_fee ' +
        'degree_level, city, credit, language from phd '
        , async (error, results) => {
            if (error) {
                console.log(error);
            }
            // console.log(results)
            if (!results) {
                return next();
            }

            for(var i =0;i<results.length;i++)
            {
                if(level.trim()===results[i].level.trim() && id.toString().trim()===results[i].subject_id.toString().trim())
                {
                    selectedData.push(results[i]);
                    console.log("check");
                }

                // else  if(level.trim()!==results[i].level.trim() && area.trim()===results[i].area.trim()){
                //     filteredData.push(results[i]);
                // }else  if(level.trim()===results[i].level.trim() && area.trim()!==results[i].area.trim())
                // {
                //     filteredData.push(results[i]);
                // }

            }

            db.query('select * from university_list',(error,results)=>{


                if(!results)
                {
                    return next();
                }
                for(var i =0;i<results.length;i++)
                {
                    if(results[i].name.trim()===selectedData[0].university.trim())
                    {
                        selectedUni = results[i];
                    }
                }

                console.log(selectedUni);
                console.log("filtered data:"+selectedData.length);
                req.dataRecord = selectedData[0];
                req.selectedUni = selectedUni;
                return next();

            });






        });


};

