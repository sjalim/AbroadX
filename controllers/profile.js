

const mysql = require("mysql");
const jwt = require('jsonwebtoken');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


exports.profile = async (res,req) => {

};