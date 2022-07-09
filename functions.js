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
// ====================================
/**
 * Функция с колбеком определяет, поддерживает ли браузер формат WebP
 * объявление функции
 * @param {*} callback 
 */
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}
/**
 * вызов функции с колбеком
 */
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }

});
// ====================================
/**
 * проверка на тач девайсы - на тачдевайсах возвращает true
 * @returns boolean
 */
const isTouchDevice = function () {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
console.log('isTouchDevice ', isTouchDevice());
// 
/**
 * проверка на ховер - на пк возвращает true на мобилках false
 */
let isHover;
// if (window.matchMedia("(any-hover:hover)").matches) {
// 	isHover = true;
// } else {
// 	isHover = false;
// } 
window.matchMedia("(any-hover:hover)").matches ? isHover = true : isHover = false;
console.log('isHover ', isHover);
// ====================================