$(document).ready(function () {
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



});