window.addEventListener('DOMContentLoaded', function () {
    function initComparison() {
        const compare = document.querySelectorAll('.compare');
        compare.forEach(function (el, i) {
            const overlay = el.querySelector('.compare__item-overlay'),
                slider = el.querySelector('.compare__slider'),
                overlayWidth = overlay.offsetWidth;
            let captured;
            overlay.style.width = (overlayWidth / 2) + "px";
            slider.style.left = (overlayWidth / 2) - (slider.offsetWidth / 2) + "px";
            slider.addEventListener("mousedown", slideReady);
            window.addEventListener("mouseup", slideFinish);
            slider.addEventListener("touchstart", slideReady);
            window.addEventListener("touchend", slideFinish);
            function slideReady(e) {
                e.preventDefault();
                captured = 1;
                window.addEventListener("mousemove", slideMove);
                window.addEventListener("touchmove", slideMove);
            }
            function slideFinish() {
                captured = 0;
            }
            function slideMove(e) {
                if (captured == 0) { return false }
                let pos = getCursorPos(e);
                if (pos < 0) { pos = 0 }
                if (pos > overlayWidth) { pos = overlayWidth }
                overlay.style.width = pos + "px";
                slider.style.left = overlay.offsetWidth - (slider.offsetWidth / 2) + "px";
            }
            function getCursorPos(e) {
                let a, x = 0;
                e = (e.changedTouches) ? e.changedTouches[0] : e;
                /* получем координату x картинки */
                a = overlay.getBoundingClientRect();
                /* получаем координату x курсора по отношению к картинке */
                x = e.pageX - a.left;
                /* корректируем с учетом прокрутки страницы */
                x = x - window.pageXOffset;
                return x;
            }

        });



    }
    initComparison();

});