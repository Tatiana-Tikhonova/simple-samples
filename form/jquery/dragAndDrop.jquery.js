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
            dropInput = $(dropZone + ' input[type=file]'),
            isMultiple = dropInput.attr('multiple'),
            progressBar = $(progress);
        dropArea.on('dragenter dragover dragleave drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        dropArea.on('drop', function (e) {
            dropInput.files = e.originalEvent.dataTransfer.files;
            let files = [];
            // проверка: инпут имеет атрибут multiple или нет
            isMultiple ? files = [...dropInput.files] : files.push(dropInput.files[0]);
            dropGallery.find('img').remove();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                fileHandler(file);
                function fileHandler(file) {
                    // если отправляем файлы вместе с формой, то updateProgress здесь не нужен
                    updateProgress(files.length);
                    previewFile(file);
                    //загрузка файлов поштучно отдельно от остальных данных формы
                    // uploadFile(file, files.length);
                }

            }
        });
        dropInput.on('change', function (e) {
            let files = [...this.files];
            dropGallery.find('img').remove();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                fileHandler(file);
                function fileHandler(file) {
                    // если отправляем файлы вместе с формой, то updateProgress здесь не нужен
                    updateProgress(files.length);
                    previewFile(file);
                    //загрузка файлов поштучно отдельно от остальных данных формы
                    // uploadFile(file, files.length);
                }

            }
        });
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
        function updateProgress(numfiles) {
            let progressVal = progressBar.val(), range = 100, part = 0;
            0 == numfiles ? part = 0 : part = range / numfiles;
            progressBar.val(+progressVal + part);

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
        function uploadFile(file, numfiles) {
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
                .done(addProgress(numfiles));
        }

    }
    dragAndDrop('[data-upload="drag-and-drop"]', '[data-upload="drag-and-drop-progress"]', '[data-upload="drag-and-drop-gallery"]');

});