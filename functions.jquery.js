// ====================================
// позиция элемента относительно окна просмотра при прокрутке
$(window).on('scroll', function (e) {
    // расстояние от элемента до верхнего края документа
    let offset = $('.form__colorpicker').offset().top,
        // высота окна просмотра (viewport)
        vh = $(window).height();
    if ($(window).scrollTop() > offset) {
        //    элемент выше окна просмотра
        console.log('top');
    }
    if ($(window).scrollTop() <= offset - vh) {
        // элемент ниже окна
        console.log('down');

    }
    if ($(window).scrollTop() > offset && $(window).scrollTop() <= offset - vh) {
        // элемент в окне
        console.log('in');

    }
    if ($(window).scrollTop() > offset - vh && $(window).scrollTop() <= offset - (vh / 2)) {
        // элемент в нижней половине окна
        console.log('in down');
    }
    if ($(window).scrollTop() <= offset && $(window).scrollTop() > offset - (vh / 2)) {
        // элемент в верней половине окна
        console.log('in top');
    }
});