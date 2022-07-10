$(document).ready(function () {


    function bindPlaceholders() {
        let ph = '';
        $('*[placeholder]').on('focus', function (e) {
            ph = $(e.target).attr('placeholder');
            $(e.target).attr('placeholder', '');
            return ph;
        });
        $('*[placeholder]').on('blur', function (e) {
            $(e.target).attr('placeholder', ph);
        });
    }
    bindPlaceholders();


});