window.addEventListener('DOMContentLoaded', function () {

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


});