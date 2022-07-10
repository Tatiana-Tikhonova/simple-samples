$(document).ready(function () {

    // =====================================================
    // отправка ajax
    $('.form').on('submit', function (e) {
        e.preventDefault();
        let t = $(this),
            // isValid = validateFields(t); //до отправки нужно вставить функцию валидации
            isValid = true; //это заглушка, ее убрать
        if (isValid) {
            // t.find('button').prop("disabled", true);
            var fd = new FormData(e.target);
            fd.append('formname', t.attr('name'));
            // прикрепляем файлы из переменной (файл bindFiles)

            let uploadFiles = t.find('input[type=file]').files; // это заглушка ее убрать
            if (uploadFiles) {
                $.each(uploadFiles, function (key, value) {
                    fd.append(key, value);
                });
            }
            return $.ajax({
                url: 'mailer.php',
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