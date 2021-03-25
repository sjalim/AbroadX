const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

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

app.listen(5000 ,() =>{
        console.log("server started at 5000...");
});