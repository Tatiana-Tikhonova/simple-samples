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
    // селект
    (function customSelect() {
        let triggers = $('[ data-select="trigger"]');
        if (triggers.length > 0) {
            triggers.each(function (index) {
                let trigger = triggers.eq(index),
                    options = trigger.next()
                inputs = options.find('input[type="radio"]');
                $(window).on('scroll', function (e) {
                    let pos = $(trigger).offset().top,
                        vh = $(window).height();
                    if ($(window).scrollTop() > $(trigger).offset().top - ($(window).height() / 2)) {
                        options.removeClass('open-on-top');

                    } else {
                        options.addClass('open-on-top');
                    }
                });
                trigger.on('click', function (e) {
                    options.toggleClass('opened');
                    if (options.css('display') == 'block') {
                        options.fadeOut();
                    }
                    else {
                        options.fadeIn();
                    }
                });
                $('body').on('click', function (e) {
                    if ($(e.target).parents('.js-select').length === 0) {
                        options.removeClass('opened');
                        options.fadeOut();
                    }
                });
                inputs.on('change', function (e) {
                    let label = $(e.target).next();
                    trigger.css('background', label.css('background'));
                    trigger.text(label.text());
                    options.removeClass('opened');
                    options.fadeOut();
                });
            });
        }
    }());
    // =====================================================
    // контроль заполнения полей
    $('inpust[name=phone]').on('input', function (e) {
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
    // очистка имени файла при ресете формы
    $('[type="reset"]').on('click', function (e) {
        $(this).parents('form').find('.form__filename').text('Файл не выбран');
    });
    // =====================================================
    // валидация формы
    function validateFields(form) {
        let isValid = false, fm = form,
            nameField = fm.find('input[name=name]'),
            phoneField = fm.find('input[name=phone]'),
            emailField = fm.find('input[name=email]'),
            agreement = fm.find('input[name=agreement]');


        if (nameField.attr('aria-required') && '' == nameField.val()) {
            addErrorMsg(nameField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != nameField.val() && nameField.val().length < 2) {
            addErrorMsg(nameField, 'Имя не менее 2-х букв!');
        }
        else {
            removeErrors(nameField);
        }
        if (phoneField.attr('aria-required') && '' == phoneField.val()) {
            addErrorMsg(phoneField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != phoneField.val() && phoneField.val().length < 11) {
            addErrorMsg(phoneField, 'Введите не менее 11 цифр!');
        }
        else {
            removeErrors(phoneField);
        }
        if (emailField.attr('aria-required') && '' == emailField.val()) {
            addErrorMsg(emailField, 'Пожалуйста, заполните это поле!');
        }
        else if ('' != emailField.val() && !emailField.val().match(/@/)) {
            addErrorMsg(emailField, 'Введите адрес электронной почты!');
        }
        else {
            removeErrors(emailField);
        }
        if (!agreement.prop('checked')) {
            addErrorMsg(agreement, 'Подтвердите согласие на обработку персональных данных!');
        }
        else {
            removeErrors(agreement);
        }
        if (nameField.hasClass('validate') && phoneField.hasClass('validate') &&
            emailField.hasClass('validate') && agreement.hasClass('validate')) {
            isValid = true;
        }
        return isValid;
    }

    function addErrorMsg(field, msg) {
        if (field.prev('.error-message').length > 0) {
            $(field).prev('.error-message').text(msg);
        } else {
            $(field).before('<div class="error-message">' + msg + '</div>');
            $(field).addClass('invalid');
            $(field).removeClass('validate');
            $(field).css('border-color', 'red');
        }

    }
    function removeErrors(field) {
        $(field).removeClass('invalid');
        $(field).addClass('validate');
        $(field).css('border-color', '');
        if (field.prev('.error-message').length > 0) {
            field.prev('.error-message').remove();
        }
    }
    // =====================================================
    // отправка ajax
    $('.form').on('submit', function (e) {
        e.preventDefault();
        let t = $(this),
            isValid = validateFields(t);

        if (isValid) {
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
                t.find('.form__filename').text('Файл не выбран');
                // window.location.href = "/thanks/";
            });
        }
    });
});