
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

}

let changeProPicButton = document.getElementById('change-pro-pic');
let cancelChangePic = document.getElementById('change_pic_cancel');
let picInputForm = document.getElementById('change_pro_pic_form');
picInputForm.style.display = 'none';
changeProPicButton.addEventListener("click",function (){

    picInputForm.style.display = 'block';
});

cancelChangePic.addEventListener("click",function (){

    picInputForm.style.display = 'none';

});