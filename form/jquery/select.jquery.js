$(document).ready(function () {


    function customSelect() {
        let triggers = $('[ data-select="trigger"]');
        if (triggers.length > 0) {
            triggers.each(function (index) {
                let trigger = triggers.eq(index),
                    options = trigger.next()
                inputs = options.find('input[type="radio"]');
                $(window).on('scroll', function (e) {
                    let pos = $(trigger).offset().top,
                        vh = $(window).height();
                    if ($(window).scrollTop() > $(trigger).offset().top - ($(window).height() / 2)) {
                        options.removeClass('open-on-top');

                    } else {
                        options.addClass('open-on-top');
                    }
                });
                trigger.on('click', function (e) {
                    options.toggleClass('opened');
                    if (options.css('display') == 'block') {
                        options.fadeOut();
                    }
                    else {
                        options.fadeIn();
                    }
                });
                $('body').on('click', function (e) {
                    if ($(e.target).parents('.js-select').length === 0) {
                        options.removeClass('opened');
                        options.fadeOut();
                    }
                });
                inputs.on('change', function (e) {
                    let label = $(e.target).next();
                    trigger.css('background', label.css('background'));
                    trigger.text(label.text());
                    options.removeClass('opened');
                    options.fadeOut();
                });
            });
        }
    }
    customSelect();


});