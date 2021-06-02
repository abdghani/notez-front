

export const tinyinit = {
    height: 800,
    menubar: true,
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
    ],
    toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help',
    file_picker_callback : (cb, value, meta) => {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function() {
            let file = input.files[0];
            let reader = new FileReader();
            reader.onload = function () {
            let id = 'blobid' + (new Date()).getTime();
            let blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
            let base64 = reader.result.split(',')[1];
            let blobInfo = blobCache.create(id, file, base64);
            
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            let image = new Image();
    
            var MAX_WIDTH = 400;
            var MAX_HEIGHT = 400;
            image.onload = function() {
                var width = image.width/1.25;
                var height = image.height/1.25;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(image, 0,0, width, height);
                console.log(canvas.toDataURL("image/jpeg", 0.3));
                cb(canvas.toDataURL("image/jpeg", 0.3), { title: file.name });
            };
            image.src = reader.result
            blobCache.add(blobInfo);
            };
            reader.readAsDataURL(file);
        };
        input.click();
    } 
}