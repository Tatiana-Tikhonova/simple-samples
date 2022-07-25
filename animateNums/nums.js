window.addEventListener('DOMContentLoaded', function () {

    window.addEventListener('scroll', function (e) {
        let elems = document.querySelectorAll('.nums-item'),
            vh = window.innerHeight;
        elems.forEach(function (el, i) {
            let offset = el.getBoundingClientRect().top;
            if (offset > 0 && offset <= vh) {
                if (!el.classList.contains('animated')) {
                    el.classList.add('animated');
                    setTimeout(function () {
                        animateNumbers();
                        animateScale();
                        /**
                         * таймаут ставить чуть меньше чем продолжительность самой длительной
                         * анимации в сумме с самой длительной задержкой. 
                         * Здесь  последняя анимация вместе с задержкой продолжается 1.2s
                         */
                    }, 1180);
                }
            }
        });
    });

    function animateNumbers() {
        let elems = document.querySelectorAll('[data-number]');
        if (elems.length > 0) {
            elems.forEach(function (el, i) {
                if (!el.classList.contains('counted')) {
                    el.classList.add('counted');
                    let start = parseInt(el.getAttribute('data-number-start')),
                        end = parseInt(el.getAttribute('data-number-end')),
                        time = parseInt(el.getAttribute('data-number-time')),
                        interval = parseInt((parseInt(time) * 1000) / (end - start));
                    let timer = setTimeout(function tick() {
                        if (start == end) {
                            clearTimeout();
                        } else {
                            start += 1;
                            el.innerHTML = start;
                        }
                        timer = setTimeout(tick, interval);
                    }, interval);
                }

            });
        }
    }
    function animateScale() {
        let elems = document.querySelectorAll('[data-scale]');
        if (elems.length > 0) {
            elems.forEach(function (el, i) {
                if (!el.classList.contains('full')) {
                    el.classList.add('full');
                    let oldOffset = el.getAttribute('data-scale-offset'),
                        end = el.getAttribute('data-scale-end'),
                        time = el.getAttribute('data-scale-time'),
                        newOffset = oldOffset - ((oldOffset / 100) * end);
                    el.setAttribute('stroke-dashoffset', newOffset);
                    el.setAttribute('style', `transition: ${time}s`);
                }

            });
        }
    }
});

