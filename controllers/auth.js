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

let currentDate = new Date();

console.log("controller/auth");
exports.login = async (req, res) => {

    console.log("at controller/auth/login()");

    try {

        const {email, password} = req.body;

        console.log("password from front" + password);

        if (!email || !password) {
            return res.status(400).render('login.hbs', {
                message: 'Please provide an email and password'
            })
        }


        if(email==="admin@admin.com" && password==="admin")
        {
            res.status(200).redirect("/admin");
        }



        db.query('select * from users where email = ?', [email], async (error, results) => {

            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login.hbs', {
                    message: 'Email or Password is incorrect'

                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                // console.log("This is the token" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
        });

    } catch (error) {
        console.log(error);
    }


};


exports.register = (req, res) => {

    console.log(req.body);

    const {name, email, country_code, phone, gender, password, confirm_password} = req.body;

    db.query('select email from users where email = ?', [email], async (error, results) => {
            if (error) {
                console.log(error)
            }

            if (results.length > 0) {
                return res.render('register.hbs', {
                    message: 'That email is already is use'
                });
            } else if (password !== confirm_password) {
                return res.render('register.hbs', {
                    message: 'Passwords do not match'
                });
            }

            let hashPassword = await bcrypt.hash(password, 8);
            console.log(hashPassword);

            db.query('insert into users set ?', {
                name: name,
                email: email,
                password: hashPassword,
                country_code : country_code,
                phone: phone,
                status: 0,
                create_date: currentDate.getDate(),
                gender: gender

            }, (error, results) => {

                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    return res.render('register.hbs', {

                        message: 'user registered'
                    });
                }

            });


        }
    );


}


exports.isLoggedIn = async (req, res, next) => {

    // console.log(req.cookies);

    if (req.cookies.jwt) {
        try {

            //verify the cookies
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);

            db.query('select * from users where id = ?', [decoded.id], (error, result) => {

                // console.log(result);
                if (!result) {
                    return next();
                }

                req.user = result[0];
                return next();

            });

            // console.log(decoded);
        } catch (error) {

            console.log(error);
            return next();

        }
    } else {

        next();
    }

}

exports.logout = async (req,res) => {
console.log("logout")
res.cookie('jwt','logout',{



    expires :new Date(Date.now() +2),
    httpOnly: true
});

res.status(200).redirect('/');

}