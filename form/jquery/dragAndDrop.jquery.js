$(document).ready(function () {
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
        const dropArea = $(dropZone);
        if (0 == dropArea.length) {
            return;
        }
        const dropGallery = $(gallery),
            dropInput = dropArea.find('input[type=file]'),
            isMultiple = dropInput.prop('multiple'),
            progressBar = $(progress);
        let uploadProgress = [];
        dropArea.on('dragenter dragover dragleave drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        dropArea.on('drop', function (e) {
            dropInput.prop('files', e.originalEvent.dataTransfer.files);
            let files = [];
            // проверка: инпут имеет атрибут multiple или нет
            // если нет то дальше обрабатываем только первый файл в наборе
            isMultiple ? files = [...e.originalEvent.dataTransfer.files] : files.push(e.originalEvent.dataTransfer.files[0]);
            filesHandler(files);
        });

        dropInput.on('change', function (e) {
            let files = [...this.files];
            filesHandler(files);
        });
        /**
         * @function fileHandler - обработчик файлов
         * @param {*} file 
         */
        function filesHandler(files) {
            dropGallery.find('img').remove();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                // если отправляем файлы поштучно отдельно от остальных данных формы,
                // то  resetProgress и displayProgress здесь не нужен
                resetProgress();
                displayProgress();
                //загрузка файлов поштучно отдельно от остальных данных формы
                // initializeProgress(files.length);
                // uploadFile(file, index, files.length);
                // отображение превью файла
                previewFile(file);
            }
        }
        /**
         * @function previewFile - показывает превью файла
         * @param {*} file 
         */
        function previewFile(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                let src = reader.result;
                dropGallery.append('<img src="' + src + '" alt="">');

            }
        }

        function resetProgress() {
            progressBar.removeAttr('style');
        }
        function displayProgress() {
            progressBar.css({
                'width': '100%',
                'transition': 'width .2s'
            });
            setTimeout(function () {
                progressBar.css('background-image', 'none');
            }, 200);

        }
        /**
         * @function initializeProgress - обнуляет шкалу прогресса 
         * и формирует массив для следующего отображения прогресса
         * при загрузке файлов поштучно отдельно от контактных данных
         * @param {number} numFiles
         */
        function initializeProgress(numFiles) {
            progressBar.css({
                'transition': 'width 0s',
                'width': '0',
                'background-image': ''
            });

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
            progressBar.css('transition', 'width 0.5s');
            if (parseInt(progressBar.css('width')) < range) {
                progressBar.css('width', uploadProgress[fileIndex] + '%');
            }
            setTimeout(function () {
                progressBar.css('background-image', 'none');
            }, 500);

        }

        // если дропзона в форме и у формы есть кнопка reset
        dropArea.parents('form').on('reset', function (e) {
            dropInput.files = undefined;
            initializeProgress(0);
            dropGallery.find('img').remove();
        });
        /**
         * Загрузка файлов на сервер поштучно отдельно от контактных данных
         * @param {*} file 
         */
        function uploadFile(file, fileIndex, numFiles) {
            let formData = new FormData();
            formData.append('file', file);
            $.ajax({
                url: 'mailer.php',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                type: 'POST',

            })
                .done(updateProgress(fileIndex, numFiles));
        }


    }
    dragAndDrop('[data-upload="drag-and-drop"]', '[data-upload="drag-and-drop-progress"]', '[data-upload="drag-and-drop-gallery"]');

});
