// ====================================
/**
 * Определение позиции элемента относительно окна просмотра при прокрутке
 * elem - элемент позицию которого надо определить
 * elemHeight - высота элемента
 * offset - расстояние от элемента до верхнего края окна просмотра (viewport)
 * vh - высота окна просмотра (viewport)
 */
window.addEventListener('scroll', function (e) {
    let elem = document.querySelector('.form__colorpicker'),
        elemHeight = elem.clientHeight,
        offset = elem.getBoundingClientRect().top,
        vh = window.innerHeight;
    /**
     * элемент выше окна просмотра
     */
    if (offset <= -elemHeight) {
        //  console.log('top');
    }
    /**
     * элемент ниже окна просмотра
     */
    if (offset >= vh) {
        //  console.log('down');
    }
    /**
     * элемент в окне просмотра
     */
    if (offset > 0 && offset <= vh) {
        // console.log('in');
    }
    /**
     * элемент в нижней половине окна
     */
    if (offset < vh && offset > (vh / 2)) {
        //  console.log('in down');
    }
    /**
     * элемент в верхней половине окна
     */
    if (offset < vh && offset <= (vh / 2) && offset > -elemHeight) {
        // console.log('in top');
    }
});