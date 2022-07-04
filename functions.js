// ====================================
// позиция элемента относительно окна просмотра при прокрутке
window.addEventListener('scroll', function (e) {
    // элемент позицию которого надо определить
    let elem = document.querySelector('.form__colorpicker'),
        // высота элемента
        elemHeight = elem.clientHeight,
        // расстояние от элемента до верхнего края окна просмотра (viewport)
        offset = elem.getBoundingClientRect().top,
        // высота скролла
        scrollHeight = window.scrollY,
        // расстояние от элемента до верхнего края документа
        pos = scrollHeight + offset,
        // высота окна просмотра (viewport)
        vh = window.innerHeight;

    if (offset <= -elemHeight) {
        //    элемент выше окна просмотра
        console.log('top');
    }
    if (offset >= vh) {
        // элемент ниже окна
        console.log('down');
    }
    if (offset > 0 && offset <= vh) {
        // элемент в окне
        console.log('in');
    }
    if (offset < vh && offset > (vh / 2)) {
        // элемент в нижней половине окна
        console.log('in down');
    }
    if (offset < vh && offset <= (vh / 2) && offset > -elemHeight) {
        // элемент в верней половине окна
        console.log('in top');
    }
});