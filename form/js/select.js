window.addEventListener('DOMContentLoaded', function () {

    /**
     * Кастомные селекты
     * @function customSelect
     */
    function customSelect() {
        let selects = document.querySelectorAll('[data-select="custom"]');
        if (selects.length > 0) {
            selects.forEach(function (select) {
                let trigger = select.querySelector('[ data-select="trigger"]'),
                    options = select.querySelector('[ data-select="options"]'),
                    inputs = select.querySelectorAll('input[type="radio"]');
                window.addEventListener('scroll', function (e) {
                    let pos = trigger.getBoundingClientRect().top,
                        vh = window.innerHeight;
                    if (pos > (vh / 2)) {
                        options.classList.add('open-on-top');
                    } else {
                        options.classList.remove('open-on-top');
                    }
                });
                trigger.addEventListener('click', function (e) {
                    options.classList.toggle('opened');
                    if (options.style.maxHeight) {
                        options.style.maxHeight = null;
                    } else {
                        options.style.maxHeight = options.scrollHeight * 2 + "px";
                    }
                });
                document.body.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (e.target != trigger || !e.target.closest('.js-select')) {
                        options.classList.remove('opened');
                        if (options.style.maxHeight) {
                            options.style.maxHeight = null;
                        }
                    }
                });
                inputs.forEach(function (input) {
                    input.addEventListener('change', function (e) {
                        if (input.checked) {
                            let label = input.nextElementSibling,
                                style = window.getComputedStyle(label);
                            trigger.textContent = label.textContent;
                            trigger.style.background = style.background;
                            trigger.style.padding = style.padding;
                            options.classList.remove('opened');
                            if (options.style.maxHeight) {
                                options.style.maxHeight = null;
                            }
                        }
                    });
                });

            });
        }

    }
    customSelect();


});