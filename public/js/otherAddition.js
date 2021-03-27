var imageView = document.getElementById('img_preview_image');
var fileChooser = document.getElementById('file_chooser');
const previewDefaultText = document.getElementById('img_preview_text');

console.log(previewDefaultText);
fileChooser.addEventListener('change', function (e) {
    console.log("at file chooser");
    const file = e.target.files[0];
    console.log(file);

    if (file) {
        const reader = new FileReader();

        previewDefaultText.style.display = 'none';


        reader.addEventListener('load', function () {
            imageView.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);


    } else {
        previewDefaultText.style.display = null;
        imageView.style.display = null;
        imageView.setAttribute("src", "");
    }

});

