$(document).ready(function () {
    function initComparison() {
        const compare = $('.compare');
        const overlay = compare.find('.compare__item-overlay'),
            slider = compare.find('.compare__slider'),
            sliderWidth = slider.width(),
            overlayWidth = overlay.width();
        let captured;

        overlay.css('width', (overlayWidth / 2) + "px");
        slider.css('left', (overlayWidth / 2) - (sliderWidth / 2) + "px");
        slider.on('mousedown', slideReady);
        $(window).on('mouseup', slideFinish);
        slider.on('touchstart', slideReady);
        $(window).on('touchend', slideFinish);

        function slideReady(e) {
            e.preventDefault();
            captured = 1;
            $(window).on('mousemove', slideMove);
            $(window).on('touchmove', slideMove);
        }
        function slideFinish() {
            captured = 0;
        }
        function slideMove(e) {
            if (captured == 0) { return false }
            let pos = getCursorPos(e);
            if (pos < 0) { pos = 0 }
            if (pos > overlayWidth) { pos = overlayWidth }
            overlay.css('width', pos + "px");
            slider.css('left', (overlay.width() - (sliderWidth / 2)) + "px");
        }
        function getCursorPos(e) {
            let a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            /* получем координату x картинки */
            a = overlay.position();
            /* получаем координату x курсора по отношению к картинке */
            x = e.pageX - a.left;
            /* корректируем с учетом прокрутки страницы */
            x = x - window.pageXOffset;
            return x;
        }
    }
    initComparison();

});