window.addEventListener('DOMContentLoaded', function () {
    // =====================================================
    // placeholders
    function bindPlaceholders() {
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

    }
    bindPlaceholders();
    // =====================================================
    // отображение имени файла при загрузке
    (function bindFiles() {

        let fileInputs = document.querySelectorAll('input[type=file]'),
            dots;
        fileInputs.forEach(function (inp) {
            inp.addEventListener('change', function (e) {
                let fileName = inp.files[0].name.split('.');
                fileName[0].length > 10 ? dots = '...' : dots = '.';
                let showName = inp.closest('.form__file').querySelector('.form__filename');
                showName.textContent = fileName[0].substring(0, 10) + dots + fileName[1];
            });
        });

    }());
    //передача файлов при отправке формы
    function uploadFiles(form) {
        let fileInput = form.querySelector('input[type=file]'),
            uploadedFiles = fileInput.files;
        return uploadedFiles;
    }

    // =====================================================
    // проверка корректного заполнения полей при вводе
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
    // валидация полей формы
    function validateFields(form) {

        let isValid = false,
            nameField = form.querySelector('input[name=name]'),
            phoneField = form.querySelector('input[name=phone]'),
            emailField = form.querySelector('input[name=email]'),
            agreement = form.querySelector('input[name=agreement]');
        if ('' == nameField.value) {
            addErrorMsg(nameField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != nameField.value && nameField.value.length < 2) {
            addErrorMsg(nameField, 'Имя не менее 2-х букв!');
        }
        else {
            removeErrors(nameField);
        }
        if ('' == phoneField.value) {
            addErrorMsg(phoneField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != phoneField.value && phoneField.value.length < 11) {
            addErrorMsg(phoneField, 'Введите не менее 11 цифр!');
        }
        else {
            removeErrors(phoneField);
        }
        if ('' == emailField.value) {
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
    function removeErrors(field) {
        field.classList.remove('invalid');
        field.classList.add('validate');
        field.style.borderColor = '';
        if (null != field.previousElementSibling && field.previousElementSibling.classList.contains('error-message')) {
            field.previousElementSibling.remove();
        }
    }
    // =====================================================
    // отправка формы с XMLHttpRequest
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
                    let files = uploadFiles(form);
                    if (files) { fd.append('files', files); }
                    req.open('POST', 'mailer.php', true);
                    req.onload = function () {
                        if (req.status >= 200 && req.status < 400) {
                            let json = JSON.parse(this.response);
                            if (json.result == "success") {
                                // showThanks();
                                form.reset();
                                form.querySelector('.form__filename').textContent = 'Файл не выбран';
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

});