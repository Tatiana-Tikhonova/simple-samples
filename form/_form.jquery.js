$(document).ready(function () {
    // =====================================================
    // placeholders
    (function bindPlaceholders() {
        let ph = '';
        $('*[placeholder]').on('focus', function (e) {
            ph = $(e.target).attr('placeholder');
            $(e.target).attr('placeholder', '');
            return ph;
        });
        $('*[placeholder]').on('blur', function (e) {
            $(e.target).attr('placeholder', ph);
        });
    }());
    // =====================================================
    // контроль заполнения полей
    $('input[name=phone]').on('input', function (e) {
        $(this).val(function (i, value) {
            return value.replace(/[a-zA-Zа-яёА-ЯЁ_=!@#%&\^\$\*\<\>]/, '');
        });
    });
    $('input[name=name]').on('input', function (e) {
        $(this).val(function (i, value) {
            return value.replace(/[\d_=!@#&\?\(\)\$\*\<\>\+\^]/, '');
        });
    });
    $('input[name=email]').on('input', function (e) {
        $(this).val(function (i, value) {
            return value.replace(/[а-яёА-ЯЁ]/, '');
        });
    });
    // =====================================================
    // прикрепление файлов
    let uploadFiles; // переменная. будет содержать данные файлов
    $('input[type=file]').on('change', function () {
        uploadFiles = this.files;
        let dots,
            fileName = uploadFiles[0].name.split('.');
        fileName[0].length > 8 ? dots = '...' : dots = '.';
        let showName = fileName[0].substring(0, 8) + dots + fileName[1];
        $(this).parents('.form__file').find('.form__filename').text(showName);

    });
    // =====================================================
    // валидация и отправка ajax
    $('.form').on('submit', function (e) {
        e.preventDefault();
        let t = $(this),
            nameField = t.find('input[name=name]'),
            phoneField = t.find('input[name=phone]'),
            emailField = t.find('input[name=email]'),
            nameVal = nameField.val(),
            phoneVal = phoneField.val(),
            emailVal = emailField.val();

        if (nameVal.match(/[0-9]/) || nameVal.length < 2) {
            nameField.css('border-color', 'red');
            nameField.before('<div class="err" style = "color:red;">Введите корректное имя!</div>');
            nameField.on('focus', function () {
                nameField.css('border-color', '');
                $('.err').remove();
            });
        }
        else if (phoneVal && phoneVal.match(/_/) || phoneVal && phoneVal.length < 11) {
            phoneField.css('border-color', 'red');
            phoneField.before('<div class="err" style = "color:red;">Введите корректный номер телефона!</div>');
            phoneField.on('focus', function () {
                phoneField.css('border-color', '');
                $('.err').remove();
            });

        }
        else if (emailVal && !emailVal.match(/@/)) {
            emailField.css('border-color', 'red');
            emailField.before('<div class="err" style = "color:red;">Введите корректный номер телефона!</div>');
            emailField.on('focus', function () {
                emailField.css('border-color', '');
                $('.err').remove();
            });
        }
        else {
            $('.err').remove();
            // t.find('button').prop("disabled", true);
            var fd = new FormData(e.target);
            fd.append('formname', t.attr('name'));
            // прикрепляем файлы из переменной
            if (uploadFiles) {
                $.each(uploadFiles, function (key, value) {
                    fd.append(key, value);
                });
            }
            return $.ajax({
                url: '/mailer.php',
                data: fd,
                dataType: 'json',
                processData: false,
                contentType: false,
                type: 'POST',

            }).done(function () {
                // showThanks();
                t.trigger('reset');
                // window.location.href = "/thanks/";
            });
        }
    });
});