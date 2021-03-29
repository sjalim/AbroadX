const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const _ = require("lodash");
const session = require("express-session");
const flash = require("connect-flash");
const Handlebars = require('hbs');


const fileUploader = require('express-fileupload');
dotenv.config({
        path: "./.env"
});

const app = express();




const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE

});

const publicDirectory = path.join(__dirname,"./public");
app.use(express.static(publicDirectory));

//grab data from html forms
app.use(express.urlencoded({
        extended: false
}));

//font data to back
app.use(express.json());

//cookie grab
app.use(cookieParser());

app.use(fileUploader());

app.use(session({
    secret: `secret`,
    cookie: { maxAge: 6000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

db.connect( (error) => {
 if(error)
 {
         console.log(error)
 }
 else{
         console.log("mysql is connected..")
 }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/admin',require('./routes/admin'));
app.use('/data',require('./routes/data'));
app.use('/', require('./routes/blog'));
app.use('/', require('./routes/scholarship'));


app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.listen(5000 ,() =>{
        console.log("server started at 5000...");
});



Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});



