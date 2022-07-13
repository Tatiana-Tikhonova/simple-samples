window.addEventListener('DOMContentLoaded', function () {

    /**
     * отображение имени файла при загрузке
     * @function bindFiles
     */
    function bindFiles() {
        let fileInputs = document.querySelectorAll('input[type=file]'),
            dots;
        fileInputs.forEach(function (inp) {
            inp.addEventListener('change', function (e) {
                if (inp.closest('.form__file')) {
                    let fileName = inp.files[0].name.split('.');
                    fileName[0].length > 10 ? dots = '...' : dots = '.';
                    let showName = inp.closest('.form__file').querySelector('.form__filename');
                    showName.textContent = fileName[0].substring(0, 10) + dots + fileName[1];
                }

            });
        });

    };
    bindFiles()

    /**
     * прикрепление файлов к formData
     * @param {*} form 
     * @returns array
     */
    function uploadFiles(form) {
        let fileInput = form.querySelector('input[type=file]'),
            uploadedFiles = fileInput.files;
        return uploadedFiles;
    }
    function resetFileInputs() {
        let resetBtns = document.querySelectorAll('[type=reset]');
        if (resetBtns.length > 0) {
            resetBtns.forEach(function (btn, i) {
                btn.addEventListener('click', function (e) {
                    const parentForm = btn.closest('form'),
                        fileInput = parentForm.querySelector('[type=file'),
                        fileName = parentForm.querySelector('.form__filename');
                    fileInput.files = null;
                    if (fileName) { fileName.textContent = 'Файл не выбран'; }

                });
            });

        }
    }
    resetFileInputs();
});