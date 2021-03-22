
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

let currentDate = new Date();


exports.login = async (req,res) =>{

    try{

        const {email, password} = req.body;

        console.log("password from front"  + password);

        if(!email || !password)
        {
            return res.status(400).render('login',{
                message : 'Please provide an email and password'
            })
        }

        db.query('select * from users where email = ?',[email], async(error,results) => {

            console.log(results);
             if(!results || !(bcrypt.compare(password,results[0].password)))
             {
                 res.status(401).render('login',{
                     message : 'Email or Password is incorrect'

                 })
             }else{
                 const id = results[0].id;

                 const  token = jwt.sign({id},process.env.JWT_SECRET, {
                     expiresIn: process.env.JWT_EXPIRES_IN
                 });

                 console.log("This is the token" +token);

                 const cookieOptions = {
                     expires : new Date(
                         Date.now() + process.env.JWT_COOKIE_EXPIRES *24 *60 * 60 *1000

                     ),
                     httpOnly : true
                 }
                 res.cookie('jwt',token, cookieOptions);
                 res.status(200).redirect("/");
             }
        });

    }catch (error)
    {
        console.log(error);
    }



};


exports.register = (req,res) => {

    console.log(req.body);

    const {name, email,country_code,phone,gender,password,confirm_password} = req.body;

    db.query('select email from users where email = ?',[email],async (error,results)=>
        {
            if(error)
            {
                console.log(error)
            }

            if(results.length >0)
            {
                    return res.render('register',{
                        message : 'That email is already is use'
                    });
            } else if(password !== confirm_password)
            {
                return  res.render('register',{
                    message : 'Passwords do not match'
                });
            }

            let hashPassword = await bcrypt.hash(password,8);
            console.log(hashPassword);

            db.query('insert into users set ?',{name:name, email:email,password:password,phone:country_code+phone,status:0,create_date:currentDate.getDate(),
                gender: gender

            }, (error,results) =>{

                if(error)
                {
                    console.log(error);
                }
                else
                {
                    console.log(results);
                    return res.render('register',{

                        message :'user registered'
                    });
                }

            });



        }
    );


}