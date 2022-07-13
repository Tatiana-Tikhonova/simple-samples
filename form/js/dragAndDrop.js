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
            filesHandler(files);
        });

        dropInput.addEventListener('change', function (e) {
            let files = [...this.files];
            filesHandler(files);
        });

        /**
         * @function fileHandler - обработчик файлов
         * @param {*} file 
         */
        function filesHandler(files) {
            // если отправляем файлы поштучно отдельно от остальных данных формы,
            // то  resetProgress и displayProgress здесь не нужен
            resetProgress();
            displayProgress();
            dropGallery.replaceChildren();
            let filesLength = files.length;
            // initializeProgress(filesLength);
            files.forEach(function (file, fileIndex) {
                previewFile(file);
                //загрузка файлов поштучно отдельно от остальных данных формы
                // uploadFile(file, fileIndex, filesLength);
            });
        }
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
         * @function resetProgress - обнуляет шкалу прогресса при прикреплении
         * файлов к форме для последующей отправки вместе с контактными данными
         */
        function resetProgress() {
            progressBar.style.transition = 'width 0s';
            progressBar.style.width = '0';
            progressBar.style.backgroundImage = '';
        }
        /**
         * @function displayProgress - заполняет шкалу прогресса на 100% при прикреплении
         * файлов к форме для последующей отправки вместе с контактными данными
         */
        function displayProgress() {
            progressBar.style.transition = 'width .5s';
            progressBar.style.width = '100%';

            setTimeout(function () {
                progressBar.style.backgroundImage = 'none';
            }, 500);

        }
        /**
         * @function initializeProgress - обнуляет шкалу прогресса 
         * и формирует массив для следующего отображения прогресса
         * при загрузке файлов поштучно отдельно от контактных данных
         * @param {number} numFiles
         */
        function initializeProgress(numFiles) {
            progressBar.style.transition = 'width 0s';
            progressBar.style.width = '0';
            progressBar.style.backgroundImage = '';
            uploadProgress = []
            for (let i = numFiles; i > 0; i--) {
                uploadProgress.push(0);
            }
        }
        /**
         * @function updateProgress - обновляет шкалу прогресса
         * при загрузке файлов поштучно отдельно от контактных данных
         * @param {number} fileIndex - индекс файла
         * @param {number} numFiles - кол-во файлов
         */

        function updateProgress(fileIndex, numFiles) {
            let range = 100,
                part = 0;
            0 == numFiles ? part = 0 : part = range / numFiles;
            uploadProgress[fileIndex] = parseInt(part * (fileIndex + 1));
            progressBar.style.transition = 'width 0.5s';
            if (parseInt(progressBar.style.width) < range) {
                progressBar.style.width = uploadProgress[fileIndex] + '%';
            }
            setTimeout(function () {
                progressBar.style.backgroundImage = 'none';
            }, 500);
        }
        // если дропзона в форме и у формы есть кнопка reset
        const parentForm = dropArea.closest('form'),
            resetBtn = parentForm.querySelector('[type=reset]');
        if (null !== resetBtn) {
            resetBtn.addEventListener('click', function (e) {
                dropInput.files = null;
                resetProgress();
                dropGallery.replaceChildren();
            });
        }


        /**
         * Загрузка файлов на сервер поштучно отдельно от контактных данных fetch
         * @param {*} file 
         */
        // function uploadFile(file, fileIndex, numfiles) {
        //     let url = 'uploader.php',
        //         formData = new FormData();
        //     formData.append('file', file);
        //     let f = fetch(url, {
        //         method: 'POST',
        //         body: formData
        //     }).then(function (response) {
        //         if (response.status >= 200 && response.status < 400) {
        //             return response.json();
        //         }
        //         else { console.log("Ошибка сервера. Номер: " + response.status); }
        //     }).then(function (json) {
        //         if (json.result == "success") {
        //             updateProgress(fileIndex, numfiles);
        //             previewFile(file);
        //         } else { alert("Ошибка. Файл не был загружен. Попробуйте еще раз"); }
        //     }).catch(function (json) {
        //         if (!json) {
        //             console.log("Ошибка сервера. Номер: " + response.status);
        //         }
        //     });
        // }

        /**
         * Загрузка файлов на сервер поштучно отдельно от контактных данных XMLHttpRequest
         * @param {*} file 
         * @param {*} i 
         */
        function uploadFile(file, fileIndex, numfiles) {

            let xhr = new XMLHttpRequest(),
                formData = new FormData();
            xhr.open('POST', 'uploader.php', true);
            // xhr.upload.addEventListener("progress", function (e) {
            //     updateProgress(fileIndex, numfiles);
            // });
            xhr.addEventListener('readystatechange', function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    updateProgress(fileIndex, numfiles);
                    previewFile(file);
                }
                else if (xhr.readyState == 4 && xhr.status != 200) {
                    // Ошибка. Сообщаем пользователю
                }
            });
            formData.append('file', file);
            xhr.send(formData);
        }

    }
    dragAndDrop('[data-upload="drag-and-drop"]', '[data-upload="drag-and-drop-progress"]', '[data-upload="drag-and-drop-gallery"]');



});
