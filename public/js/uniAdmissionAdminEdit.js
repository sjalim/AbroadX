/*
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});*/



var mybutton = document.getElementById("myBtn");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


var updateButton = document.getElementById("update_button");
// var updateSection = document.getElementById("update_section");
// var cancelButton = document.getElementById("cancel_button");
// var updateForm = document.getElementById("update_form");
// var deleteForm = document.getElementById("delete_button");
// var deleteSection = document.getElementById("delete_section");
// var deleteButton = document.getElementById("delete_button");
// var deleteCancelButton = document.getElementById("cancel_button_delete");
// var deleteForm = document.getElementById("delete_form");
// var totalButton = document.getElementById("content-total");
// var bachelorButton = document.getElementById("content-bachelor");
// var masterButton = document.getElementById("content-master");
// var phdButton = document.getElementById("content-phd");
// var titleH4 = document.getElementById("selected_options_title");
// var rows = document.getElementById("all_rows");

// updateSection.style.display = 'none';
// deleteSection.style.display = 'none';


// cancelButton.addEventListener("click", function () {
//     updateSection.style.display = 'none';
//     // updateForm.reset();
// });
//

// updateButton.addEventListener("click", function () {
//
//     updateSection.style.display = 'block';
//     deleteSection.style.display = 'none';
//     // deleteForm.reset();
//
//     var i=0;
//     var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
//     for (var checkbox of markedCheckbox) {
//         i++;
//     }
//     if(i==1)
//     {
//         var box = document.querySelector('input[type="checkbox"]:checked');
//
//        var id = box.getAttribute("value");
//
//    /*    db.query('select * from Bachelor where subject_id = ?',[id], (error,results)=>{
//
//            if(!results)
//            {
//                console.log("results for js edit!");
//                console.log(results);
//            }
//
//
//
//        });*/
//
//
//     }
//
//
// });

// deleteButton.addEventListener("click", function () {
//     deleteSection.style.display = 'block';
//     updateSection.style.display = 'none';
//     // updateForm.reset();
//
// });

// deleteCancelButton.addEventListener("click", function () {
//
//     deleteSection.style.display = 'none';
//     deleteForm.reset();
// });


// totalButton.addEventListener("click", function () {
//
//     totalButton.style.backgroundColor = "#0F75A8";
//     bachelorButton.style.backgroundColor = "";
//     masterButton.style.backgroundColor = "";
//     phdButton.style.backgroundColor = "";
//     titleH4.innerText = "Total";
//
//
// });
//
// bachelorButton.addEventListener("click", function () {
//
//     bachelorButton.style.backgroundColor = "#0F75A8";
//     totalButton.style.backgroundColor = "";
//     masterButton.style.backgroundColor = "";
//     phdButton.style.backgroundColor = "";
//     titleH4.innerText = "Bachelor";
//
//
//
// });
//
// masterButton.addEventListener("click", function () {
//
//     masterButton.style.backgroundColor = "#0F75A8";
//     phdButton.style.backgroundColor = "";
//     bachelorButton.style.backgroundColor = "";
//     totalButton.style.backgroundColor = "";
//     titleH4.innerText = "Master";
//
// });
//
//
// phdButton.addEventListener("click", function () {
//
//     phdButton.style.backgroundColor = "#0F75A8";
//     bachelorButton.style.backgroundColor = "";
//     totalButton.style.backgroundColor = "";
//     masterButton.style.backgroundColor = "";
//     titleH4.innerText = "PhD";
//
//
// });
//
