window.addEventListener('DOMContentLoaded', function () {
    // =====================================================
    /**
     * Обработка плейсхолдеров
     * @function bindPlaceholders
     */
    (function bindPlaceholders() {
        let inputs = document.querySelectorAll('[placeholder]');
        inputs.forEach(function (input, i) {
            let placeholder = input.getAttribute('placeholder');
            input.addEventListener('focus', function (e) {
                input.setAttribute('placeholder', '');
            });
            input.addEventListener('blur', function (e) {
                input.setAttribute('placeholder', placeholder);
            });
        });

    }());

    // =====================================================
    /**
     * Кастомные селекты
     * @function customSelect
     */
    (function customSelect() {
        let selects = document.querySelectorAll('[data-select="custom"]');
        if (selects.length > 0) {
            selects.forEach(function (select) {
                let trigger = select.querySelector('[ data-select="trigger"]'),
                    options = select.querySelector('[ data-select="options"]'),
                    inputs = select.querySelectorAll('input[type="radio"]');
                window.addEventListener('scroll', function (e) {
                    let pos = trigger.getBoundingClientRect().top,
                        vh = window.innerHeight;
                    if (pos > (vh / 2)) {
                        options.classList.add('open-on-top');
                    } else {
                        options.classList.remove('open-on-top');
                    }
                });
                trigger.addEventListener('click', function (e) {
                    options.classList.toggle('opened');
                    if (options.style.maxHeight) {
                        options.style.maxHeight = null;
                    } else {
                        options.style.maxHeight = options.scrollHeight * 2 + "px";
                    }
                });
                document.body.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (e.target != trigger || !e.target.closest('.js-select')) {
                        options.classList.remove('opened');
                        if (options.style.maxHeight) {
                            options.style.maxHeight = null;
                        }
                    }
                });
                inputs.forEach(function (input) {
                    input.addEventListener('change', function (e) {
                        if (input.checked) {
                            let label = input.nextElementSibling,
                                style = window.getComputedStyle(label);
                            trigger.textContent = label.textContent;
                            trigger.style.background = style.background;
                            trigger.style.padding = style.padding;
                            options.classList.remove('opened');
                            if (options.style.maxHeight) {
                                options.style.maxHeight = null;
                            }
                        }
                    });
                });

            });
        }

    }());
    // =====================================================
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
    function uploadFiles(form) {
        let fileInput = form.querySelector('input[type=file]'),
            uploadedFiles = fileInput.files;
        return uploadedFiles;
    }

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
        const dropInput = dropArea.querySelector('input[type=file]'),
            dropGallery = dropArea.querySelector(gallery),
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
            let files = [...e.dataTransfer.files];
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
        //         .then(updateProgress)
        //         .catch(() => { /* Ошибка. Информируем пользователя */ });
        // }

        /**
         * Загрузка файлов на сервер поштучно отдельно от контактных данных XMLHttpRequest
         * @param {*} file 
         * @param {*} i 
         */
        // function uploadFile(file, fileIndex) {
        //     console.log(file);

        //     var url = 'mailer.php',
        //         xhr = new XMLHttpRequest(),
        //         formData = new FormData();
        //     xhr.open('POST', url, true);  // Добавили следующие слушатели
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
    // =====================================================
    /**
     * проверка корректного заполнения полей при вводе
     * @function checkInputs
     */
    (function checkInputs() {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            let name = input.getAttribute('name'),
                typeAttr = input.getAttribute('type');

            input.addEventListener('input', function (e) {
                if ('number' == typeAttr) {
                    if (input.value.match(/\D*/)) {
                        input.value = input.value.replace(/\D/, '');
                    }
                    if (input.value > +input.getAttribute('max')) {
                        input.value = +input.getAttribute('max');
                    } else if (input.value < +input.getAttribute('min')) {
                        input.value = +input.getAttribute('min')
                    }
                }
                if ('name' == name && input.value.match(/[0-9_=!@#&\?\(\)\$\*\<\>\+\^]/)) {
                    input.value = input.value.replace(/[0-9_=!@#&\?\(\)\$\*\<\>\+\^]/, '');
                }
                if ('tel' == typeAttr && input.value.match(/[a-zA-Zа-яёА-ЯЁ_=!@#%&\^\$\*\<\>]/)) {
                    input.value = input.value.replace(/[a-zA-Zа-яёА-ЯЁ_=!@#%&\^\$\*\<\>]/, '');
                }
                if ('email' == name && input.value.match(/[а-яёА-ЯЁ]/)) {
                    input.value = input.value.replace(/[а-яёА-ЯЁ]/, '');
                }
            });
        });
    }());
    // =====================================================
    /**
     * валидация полей формы
     * @param {*} form 
     * @returns {boolean}
     */
    function validateFields(form) {

        let isValid = false,
            nameField = form.querySelector('input[name=name]'),
            phoneField = form.querySelector('input[name=phone]'),
            emailField = form.querySelector('input[name=email]'),
            agreement = form.querySelector('input[name=agreement]');
        if (nameField.getAttribute('aria-required') && '' == nameField.value) {
            addErrorMsg(nameField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != nameField.value && nameField.value.length < 2) {
            addErrorMsg(nameField, 'Имя не менее 2-х букв!');
        }
        else {
            removeErrors(nameField);
        }
        if (phoneField.getAttribute('aria-required') && '' == phoneField.value) {
            addErrorMsg(phoneField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != phoneField.value && phoneField.value.length < 11) {
            addErrorMsg(phoneField, 'Введите не менее 11 цифр!');
        }
        else {
            removeErrors(phoneField);
        }
        if (emailField.getAttribute('aria-required') && '' == emailField.value) {
            addErrorMsg(emailField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != emailField.value && !emailField.value.match(/@/)) {
            addErrorMsg(emailField, 'Введите адрес электронной почты!');
        }
        else {
            removeErrors(emailField);
        }
        if (!agreement.checked) {
            addErrorMsg(agreement, 'Подтвердите согласие на обработку персональных данных!');
        }
        else {
            removeErrors(agreement);
        }
        if (nameField.classList.contains('validate') &&
            phoneField.classList.contains('validate') &&
            emailField.classList.contains('validate') &&
            agreement.classList.contains('validate')) {
            isValid = true;
        }
        return isValid;
    }
    /**
     * Вывод сообщения об ошибке в поле формы
     * @function addErrorMsg
     * @param {*} field - текущее поле формы
     * @param {*} msg - сообщение об ошибке
     */
    function addErrorMsg(field, msg) {
        let errMessage = document.createElement('div');
        errMessage.classList.add('error-message');
        field.classList.add('invalid');
        field.classList.remove('validate');
        field.style.borderColor = 'red';
        if (null != field.previousElementSibling && field.previousElementSibling.classList.contains('error-message')) {
            field.previousElementSibling.textContent = msg;

        } else {
            errMessage.textContent = msg;
            field.closest('form').insertBefore(errMessage, field);
        }
    }
    /**
     * Удаление сообщения об ошибке при правильном заполнении поля формы
     * @function removeErrors
     * @param {*} field 
     */
    function removeErrors(field) {
        field.classList.remove('invalid');
        field.classList.add('validate');
        field.style.borderColor = '';
        if (null != field.previousElementSibling && field.previousElementSibling.classList.contains('error-message')) {
            field.previousElementSibling.remove();
        }
    }
    // =====================================================
    /**
     * отправка любой формы на странице с XMLHttpRequest
     */
    function sendForm() {
        let forms = document.querySelectorAll('.form');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                let isValid = validateFields(form),
                    fname = form.getAttribute('name');
                if (true === isValid) {
                    const req = new XMLHttpRequest(),
                        fd = new FormData(form);
                    fd.append('fname', fname);
                    // прикрепление нескольких файлов к форме (необязательно, прикрепляются и без этого)
                    // let files = uploadFiles(form);
                    // if (files.length > 0) { fd.append('files', files); }
                    // прикрепление одного файла к форме (необязательно, прикрепляются и без этого)
                    // let file = uploadFiles(form);
                    // if (file.length > 0) { fd.append('file', file); }
                    req.open('POST', 'mailer.php', true);
                    req.onload = function () {
                        if (req.status >= 200 && req.status < 400) {
                            let json = JSON.parse(this.response);
                            if (json.result == "success") {
                                // showThanks();
                                form.reset();
                                // - если при загрузке файла отображается его имя - очищаем
                                // form.querySelector('.form__filename').textContent = 'Файл не выбран'; 
                                // window.location.href = "https://mysite.ru/thanks/";
                            } else {
                                console.log("Ошибка. Сообщение не отправлено");
                            }
                        } else { console.log("Ошибка сервера. Номер: " + req.status); }
                    };

                    // Если не удалось отправить запрос. Стоит блок на хостинге
                    req.onerror = function () { console.log("Ошибка отправки запроса"); };
                    req.send(fd);
                }
            });
        })
    }
    sendForm();
    // =====================================================
    /**
     * отправка любой формы на странице с fetch
     */
    function fetchForm() {
        let forms = document.querySelectorAll('.form');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                let isValid = validateFields(form),
                    fname = form.getAttribute('name');
                if (true === isValid) {
                    let fd = new FormData(form);
                    fd.append('fname', fname);
                    // прикрепление нескольких файлов к форме (необязательно, прикрепляются и без этого)
                    // let files = uploadFiles(form);
                    // if (files.length > 0) { fd.append('files', files); }
                    // прикрепление одного файла к форме (необязательно, прикрепляются и без этого)
                    // let file = uploadFiles(form);
                    // if (file.length > 0) { fd.append('file', file); }
                    fetch('mailer.php', {
                        method: 'POST',
                        body: fd,
                    }).then(function (response) {
                        if (response.status >= 200 && response.status < 400) {
                            return response.json();
                        }
                        else { console.log("Ошибка сервера. Номер: " + response.status); }

                    }).then(function (json) {
                        if (json.result == "success") {
                            // showThanks();
                            form.reset();
                            // - если при загрузке файла отображается его имя - очищаем
                            // form.querySelector('.form__filename').textContent = 'Файл не выбран';
                            // window.location.href = "https://mysite.ru/thanks/";
                        } else {
                            console.log("Ошибка. Сообщение не отправлено");
                        }
                    }).catch(function (json) {
                        if (!json) {
                            console.log("Ошибка сервера. Номер: " + response.status);

                        }
                    });
                }
            });
        });
    }
    // fetchForm();

});
