$(document).ready(function () {
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
            isValid = validateFields(t); //до отправки нужно вставить функцию валидации
        // isValid = true; //это заглушка, ее убрать
        if (isValid) {
            // t.find('button').prop("disabled", true);
            let fd = new FormData(e.target);
            fd.append('formname', t.attr('name'));
            // прикрепляем файлы из переменной (файл bindFiles)

            // let uploadFiles = t.find('input[type=file]').files; // это заглушка ее убрать


            // if (uploadFiles) {
            //     $.each(uploadFiles, function (key, value) {
            //         fd.append(key, value);
            //     });
            // }
            $.ajax({
                url: 'mailer.php',
                data: fd,
                dataType: 'json',
                processData: false,
                contentType: false,
                type: 'POST',

            }).done(function () {
                // showThanks();
                t.trigger('reset');
                // t.find('.form__filename').text('Файл не выбран');
                // window.location.href = "/thanks/";
            });
        }
    });
});