// ====================================
/**
 * Определение позиции элемента относительно окна просмотра при прокрутке
 */
$(window).on('scroll', function (e) {
    /**
     * offset - расстояние от целевого элемента до верхнего края документа
     * vh - высота окна просмотра (viewport)
     */
    let offset = $('.form__colorpicker').offset().top,
        vh = $(window).height();
    /**
     * элемент выше окна просмотра
     */
    if ($(window).scrollTop() > offset) {
        // console.log('top');
    }
    /**
     * элемент ниже окна просмотра
     */
    if ($(window).scrollTop() <= offset - vh) {
        // console.log('down');
    }
    /**
     * элемент в окне просмотра
     */
    if ($(window).scrollTop() > offset && $(window).scrollTop() <= offset - vh) {
        // console.log('in');
    }
    /**
     * элемент в нижней половине окна
     */
    if ($(window).scrollTop() > offset - vh && $(window).scrollTop() <= offset - (vh / 2)) {
        // console.log('in down');
    }
    /**
     * элемент в верхней половине окна
     */
    if ($(window).scrollTop() <= offset && $(window).scrollTop() > offset - (vh / 2)) {
        // console.log('in top');
    }
});
// ====================================
/**
 * Направление скролла
 */

let lastScrollTop = 0;
$(window).on('scroll', function (e) {
    if (lastScrollTop > $(window).scrollTop()) {
        console.log('up');
    }
    else {
        console.log('down');
    }
    lastScrollTop = $(window).scrollTop();
});