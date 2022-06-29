$(document).ready(function () {
    // =============================================
    $('.my-slider').slick({
        infinite: true,//бесконечная прокрутка
        slidesToShow: 1,//сколько слайдов показать
        slidesToScroll: 1,//сколько слайдов скроллить
        responsive: [ // адаптивность по дефолту от десктопа к мобилке (max-width)

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 350,
                settings: "unslick"//отключаем слайдер на нужном брейкпойнте
            },
        ]
    });
    // =============================================
});