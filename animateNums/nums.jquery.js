$(document).ready(function () {
    $(window).on('scroll', function (e) {
        let elems = $('.nums-item'),
            offset = $(elems).offset().top,
            elHt = $(elems).height(),
            vh = $(window).height();
        console.log(elHt);
        elems.each(function (i) {
            if ($(window).scrollTop() > offset - vh && $(window).scrollTop() <= offset + elHt) {
                if (!$(this).hasClass('animated')) {
                    $(this).addClass('animated');
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
        let elems = $('[data-number]');
        if (elems.length > 0) {
            elems.each(function (i) {
                let el = $(this);
                if (!el.hasClass('counted')) {
                    el.addClass('counted');
                    let start = parseInt(el.attr('data-number-start')),
                        end = parseInt(el.attr('data-number-end')),
                        time = parseInt(el.attr('data-number-time')),
                        interval = parseInt((parseInt(time) * 1000) / (end - start));
                    let timer = setTimeout(function tick() {
                        if (start == end) {
                            clearTimeout();
                        } else {
                            start += 1;
                            el.html(start);
                        }
                        timer = setTimeout(tick, interval);
                    }, interval);
                }
            });
        }
    }
    function animateScale() {
        let elems = $('[data-scale]');
        if (elems.length > 0) {
            elems.each(function (i) {
                let el = $(this);
                if (!el.hasClass('full')) {
                    el.addClass('full');
                    let oldOffset = el.attr('data-scale-offset'),
                        end = el.attr('data-scale-end'),
                        time = el.attr('data-scale-time'),
                        newOffset = oldOffset - ((oldOffset / 100) * end);
                    el.attr('stroke-dashoffset', newOffset);
                    el.attr('style', `transition: ${time}s`);
                }

            });
        }
    }
});