// const mysql = require("/mysql");
// const jwt = require('jsonwebtoken');
// let email;
//
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
//
// });

function edit() {
    var edit = document.getElementsByClassName('edit');
    var show = document.getElementsByClassName('show');
    var updateButton = document.getElementById('update-btn');
    email = document.getElementById('edit-email');

    if (updateButton.style.visibility === 'hidden') {
        updateButton.style.visibility = 'visible';
    } else {
        updateButton.style.visibility = 'hidden';
    }

    for (var i = 0; i < edit.length; i++) {

        if (edit[i].style.visibility === 'hidden') {
            edit[i].style.visibility = 'visible';

            for (var j = 0; j < show.length; j++) {
                show[i].style.visibility = 'hidden';
            }


        } else {
            edit[i].style.visibility = 'hidden';
            for (var j = 0; j < show.length; j++) {
                show[i].style.visibility = 'visible';
            }
        }

    }


    document.getElementById('update-btn').addEventListener("click", function () {

        var nameInput = document.getElementById('edit-name').value;


        var skillsSelect = document.getElementById("country-code");
        var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;
        console.log(selectedText);
    });

    // var emailInput = document.getElementById('').value;
    // var phoneInput = document.getElementById('').value;




// db.query('select * from users email = ?' ,[email],async (error,results) =>{
//
//     console.log(results);
//
//
// });

}
