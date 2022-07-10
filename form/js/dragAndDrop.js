window.addEventListener('DOMContentLoaded', function () {

    /**
     * @function dragAndDrop -  загрузка нескольких файлов перетаскиванием
     * с отображением превьюшек и шкалой прогресса
     * drag * - срабатывает на перетаскиваемом элементе
     * dragend * - срабатывает на перетаскиваемом элементе
     * dragenter - срабатывает когда перетаскиваемый объект находится над dropArea
     * dragexit * - срабатывает на перетаскиваемом элементе
     * dragleave - срабатывает когда перетаскиваемый объект находится за пределами dropArea
     * dragover - срабатывает когда перетаскиваемый объект зависает или двигается над dropArea
     * dragstart * - срабатывает на перетаскиваемом элементе
     * drop - срабатывает когда перетаскиваемый объект упал в dropArea
     */
    function dragAndDrop(dropZone, progress, gallery) {
        const dropArea = document.querySelector(dropZone);
        if (!dropArea) {
            return;
        }
        const dropGallery = dropArea.querySelector(gallery),
            dropInput = dropArea.querySelector('input[type=file]'),
            isMultiple = dropInput.getAttribute('multiple'),
            progressBar = dropArea.querySelector(progress);
        let uploadProgress = [];

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
            dropArea.addEventListener(eventName, function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });
        dropArea.addEventListener('drop', function (e) {
            dropInput.files = e.dataTransfer.files;
            let files = [];
            // проверка: инпут имеет атрибут multiple или нет
            null !== isMultiple ? files = [...dropInput.files] : files.push(dropInput.files[0]);
            initializeProgress(files.length);
            dropGallery.replaceChildren();
            files.forEach(function (file, fileIndex) {
                updateProgress(fileIndex, (e.loaded * 100.0 / e.total) || 100);
                previewFile(file);
                //загрузка файлов поштучно отдельно от остальных данных формы
                // uploadFile(file, fileIndex); 
            });

        });

        dropInput.addEventListener('change', function (e) {
            let files = [...this.files];
            initializeProgress(files.length);
            dropGallery.replaceChildren();
            files.forEach(function (file, fileIndex) {
                updateProgress(fileIndex, (e.loaded * 100.0 / e.total) || 100);
                previewFile(file);
                //загрузка файлов поштучно отдельно от остальных данных формы
                // uploadFile(file, fileIndex); 

            });
        });
        /**
         * @function previewFile - показывает превью файла
         * @param {*} file 
         */
        function previewFile(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                let img = document.createElement('img');
                img.src = reader.result;
                dropGallery.appendChild(img);

            }
        }
        /**
         * @function initializeProgress - запускает шкалу прогресса
         * @param {number} numfiles 
         */
        function initializeProgress(numfiles) {
            progressBar.value = 0;
            uploadProgress = [];
            for (let i = numfiles; i > 0; i--) {
                uploadProgress.push(0);
            }
        }
        /**
         * @function updateProgress - обновляет шкалу прогресса
         * @param {number} fileIndex
         * @param {number} percent 
         */
        function updateProgress(fileIndex, percent) {
            uploadProgress[fileIndex] = percent;
            let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
            progressBar.value = total;
        }
        // если дропзона в форме и у формы есть кнопка reset
        const parentForm = dropArea.closest('form'),
            resetBtn = parentForm.querySelector('[type=reset]');
        if (null !== resetBtn) {
            resetBtn.addEventListener('click', function (e) {
                dropInput.files = null;
                initializeProgress(0);
                dropGallery.replaceChildren();
            });
        }


        /**
         * Загрузка файлов на сервер поштучно отдельно от контактных данных fetch
         * @param {*} file 
         */
        // function uploadFile(file) {
        //     let url = 'mailer.php',
        //         formData = new FormData();
        //     formData.append('file', file);
        //     fetch(url, {
        //         method: 'POST',
        //         body: formData
        //     })
        //         .then(updateProgress(i, (e.loaded * 100.0 / e.total) || 100))
        //         .catch(() => { /* Ошибка. Информируем пользователя */ });
        // }

        /**
         * Загрузка файлов на сервер поштучно отдельно от контактных данных XMLHttpRequest
         * @param {*} file 
         * @param {*} i 
         */
        // function uploadFile(file, fileIndex) {

        //     var url = 'mailer.php',
        //         xhr = new XMLHttpRequest(),
        //         formData = new FormData();
        //     xhr.open('POST', url, true);
        //     xhr.upload.addEventListener("progress", function (e) {
        //         updateProgress(fileIndex, (e.loaded * 100.0 / e.total) || 100);
        //     });
        //     xhr.addEventListener('readystatechange', function (e) {
        //         if (xhr.readyState == 4 && xhr.status == 200) {
        //             updateProgress(fileIndex, 100);
        //         }
        //         else if (xhr.readyState == 4 && xhr.status != 200) {
        //             // Ошибка. Сообщаем пользователю
        //         }
        //     });
        //     formData.append('file', file);
        //     xhr.send(formData);
        // }

    }
    dragAndDrop('[data-upload="drag-and-drop"]', '[data-upload="drag-and-drop-progress"]', '[data-upload="drag-and-drop-gallery"]');



});