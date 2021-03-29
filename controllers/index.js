const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

exports.counter = (req, res) => {
    let totalUniversities = ``;
    let totalScholarships = ``;
    let totalTopics = ``;

    db.query('SELECT COUNT(*) as noOfTopics FROM blogs',async (err, rows) => {
        if(!err) {
            await saveTotalTopics(rows[0].noOfTopics)

        } else {
            console.log(err)
        }
    })

    db.query('SELECT COUNT(*) as noOfScholarships FROM scholarships',async (err, rows) => {
        if(!err) {
           await saveTotalSchola(rows[0].noOfScholarships)

        } else {
            console.log(err)
        }
    })
    db.query('SELECT COUNT(*) as noOfUniversities FROM university_list', async (err, rows) => {
        if(!err) {
            await saveTotalUni(rows[0].noOfUniversities)
        } else {
            console.log(err)
        }
    })
    function saveTotalUni(value) {
        totalUniversities = value;
        res.render('index',{
            user : req.user,
            countUniversities: totalUniversities,
            countScholarships: totalScholarships,
            countTopics: totalTopics
        });
    }
    function saveTotalSchola(value) {
        totalScholarships = value;
    }

    function saveTotalTopics(value) {
        totalTopics = value;
    }

}