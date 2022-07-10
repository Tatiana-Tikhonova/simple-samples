window.addEventListener('DOMContentLoaded', function () {

    /**
     * Обработка плейсхолдеров
     * @function bindPlaceholders
     */
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


});