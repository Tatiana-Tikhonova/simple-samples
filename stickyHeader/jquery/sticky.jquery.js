$(document).ready(function () {
    let header = $(".header"),
        navbar = $(".navbar"),
        content = $(".content"),
        sticky = navbar.offset().top;

    $('body').css('margin-top', header.innerHeight() + 'px'); //это для shrinkHeader() и floatHeader()

    function stickyNavbar() {
        if ($(window).scrollTop() >= sticky) {
            navbar.addClass("sticky-nav");
        }
        else {
            navbar.removeClass("sticky-nav");
        }
    }

    function shrinkHeader() {
        if ($(window).scrollTop() >= header.innerHeight()) {
            header.css('padding', '20px 10px');
            header.find(".logo").css('font-size', '32px');
            header.find(".menu__link").css('font-size', '18px');
        }
        else {
            header.css('padding', '40px 0');
            header.find(".logo").css('font-size', '44px');
            header.find(".menu__link").css('font-size', '32px');
        }
    }

    function floatHeader() {
        if ($(window).scrollTop() > header.innerHeight() && $(window).scrollTop() < $(window).height() / 1.2) {
            header.removeClass('slide-down');
            header.addClass('slide-up');
        }
        else if ($(window).scrollTop() >= $(window).height() / 1.2) {
            header.removeClass('slide-up');
            header.css('position', 'fixed');
            header.addClass('slide-down');
        }
        else if ($(window).scrollTop() <= header.innerHeight()) {
            header.removeClass('slide-up');
            header.removeClass('slide-down');
            header.css('position', 'absolute');
        }
    }
    let lastScrollTop = 0;
    function stickyOnScrollUp() {
        if ($(window).scrollTop() >= $(window).height() / 1.2) {
            if (lastScrollTop > $(window).scrollTop()) {
                header.css('position', 'fixed');
                header.removeClass('slide-up');
                header.addClass('slide-down');
            }
            lastScrollTop = $(window).scrollTop();
        }
        else if ($(window).scrollTop() > header.innerHeight() && $(window).scrollTop() < $(window).height() / 1.2) {
            header.removeClass('slide-down');
            header.addClass('slide-up');
        }
        else if ($(window).scrollTop() <= header.innerHeight()) {
            header.removeClass('slide-up');
            header.removeClass('slide-down');
            header.css('position', 'absolute');
        }
    }


    $(window).on('scroll', function (e) {
        // stickyNavbar();
        // shrinkHeader();
        // floatHeader();
        stickyOnScrollUp();
    });
});