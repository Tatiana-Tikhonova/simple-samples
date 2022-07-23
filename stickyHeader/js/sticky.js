window.addEventListener('DOMContentLoaded', function () {
    let header = document.querySelector(".header"),
        navbar = document.querySelector(".navbar"),
        content = document.querySelector(".content"),
        sticky = navbar.offsetTop;
    document.body.style.marginTop = header.offsetHeight + 'px'; //это для shrinkHeader() и floatHeader()

    function stickyNavbar() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky-nav");
        } else {
            navbar.classList.remove("sticky-nav");
        }
    }

    function shrinkHeader() {
        if (document.body.scrollTop > header.offsetHeight || document.documentElement.scrollTop > header.offsetHeight) {
            header.style.padding = "20px 10px";
            header.querySelector(".logo").style.fontSize = "32px";
            header.querySelectorAll(".menu__link").forEach(function (el, i) {
                el.style.fontSize = "18px";
            });
        } else {
            header.style.padding = "40px 0";
            header.querySelector(".logo").style.fontSize = "44px";
            header.querySelectorAll(".menu__link").forEach(function (el, i) {
                el.style.fontSize = "32px";
            });
        }
    }

    function floatHeader() {

        if (window.pageYOffset > header.offsetHeight && window.pageYOffset < window.innerHeight / 1.2) {
            header.classList.remove('slide-down');
            header.classList.add('slide-up');
        }
        else if (window.pageYOffset >= window.innerHeight / 1.2) {
            header.classList.remove('slide-up');
            header.style.position = 'fixed';
            header.classList.add('slide-down');
        }
        else if (window.pageYOffset <= header.offsetHeight) {
            header.classList.remove('slide-up');
            header.classList.remove('slide-down');
            header.style.position = 'absolute';
        }
    }

    let lastScrollTop = 0;
    function stickyOnScrollUp() {
        if (window.pageYOffset >= window.innerHeight / 1.2) {
            if (lastScrollTop > window.pageYOffset) {
                header.style.position = 'fixed';
                header.classList.remove('slide-up');
                header.classList.add('slide-down');
            }
            lastScrollTop = window.pageYOffset;
        }
        else if (window.pageYOffset > header.offsetHeight && window.pageYOffset < window.innerHeight / 1.2) {
            header.classList.remove('slide-down');
            header.classList.add('slide-up');
        }
        else if (window.pageYOffset <= header.offsetHeight) {
            header.classList.remove('slide-up');
            header.classList.remove('slide-down');
            header.style.position = 'absolute';
        }


    }
    window.onscroll = function () {
        // stickyNavbar();
        // shrinkHeader();
        // floatHeader();
        stickyOnScrollUp();
    };
});