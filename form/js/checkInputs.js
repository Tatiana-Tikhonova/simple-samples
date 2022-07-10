window.addEventListener('DOMContentLoaded', function () {

    /**
     * проверка корректного заполнения полей при вводе
     * @function checkInputs
     */
    function checkInputs() {
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
    }
    checkInputs();


});