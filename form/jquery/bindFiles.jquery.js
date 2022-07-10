$(document).ready(function () {

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


});