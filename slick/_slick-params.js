$('.slider').slick({
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
			breakpoint: 600,
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
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	]
});

// {
//параметры и значения по умолчанию
// infinite: true,//бесконечная прокрутка
	// slidesToShow: 1,//сколько слайдов показать
		// slidesToScroll: 1,//сколько слайдов скроллить
	// appendArrows: $(element),//куда вставить стрелки
	// appendDots: $(element),//куда вставить точки
	// dots: false,//точки
	// dotsClass: slick - dots,//класс для контейнера точек
	// arrows: true,//стрелки
	// prevArrow: $(element), // по умолчанию <button type="button" class="slick-prev">Previous</button>
	// nextArrow: $(element), // по умолчанию <button type="button" class="slick-next">Next</button>
	// adaptiveHeight: false,//адаптивная высота
	// variableWidth: false,//слайды разной ширины
	// vertical: false,//вертикальный слайдер
	// verticalSwiping: false,//вертикальный свайпинг
	// autoplay: false,//автопрокрутка
	// autoplaySpeed: false,//скорость автопрокрутки
	// asNavFor: null, // строка с классом или id слайдера, для которого этот служит навигацией
	// centerMode: false, // активный слайд по центру
	// centerPadding: '50px',//паддинг для центрирования слайда
	// lazyLoad: 'ondemand', //ленивая загрузка катринки Принимает "ondemand" или "progressive" 
	// fade: false,//появление вместо прокрутки
	// cssEase: 'ease', //тип css анимации
	// easing: 'linear',//jquery анимация
	// speed: 300, //скорость анимации
	// edgeFriction: 0.15, //Сопротивление при скольжении по краям небесконечных каруселей
	// initialSlide: 0, //начальный слайд
	// customPaging: function (slider, i) {// кастомная пагинация
	// 	return $('<button type="button" />').text(i + 1);
	// },
	// draggable: true, //перетягивание слайда мышкой
	// focusOnSelect: false,//включает фокус на выбранном слайде по клику
	// focusOnChange: false,
	// pauseOnHover: true, //пауза при наведении на слайд
	// pauseOnFocus: true, //пауза при фокусе на слайд
	// pauseOnDotsHover: false, //пауза при наведении на точку слайда
	// rows: 1,//количество строк в одном слайде (режим сетки)
	// slidesPerRow: 1, //сколько слайдов в строке в режиме сетки

	// swipe: true, //свайпинг
	// mobileFirst: false, //адаптив от мобилок к дестопам (min-width)
	// responsive: [ // адаптивность по дефолту от десктопа к мобилке (max-width)

	// 	{
	// 		breakpoint: 1024,
	// 		settings: {
	// 			slidesToShow: 3,
	// 			slidesToScroll: 3,
	// 			infinite: true,
	// 			dots: true
	// 		}
	// 	},
	// 	{
	// 		breakpoint: 600,
	// 		settings: {
	// 			slidesToShow: 2,
	// 			slidesToScroll: 2
	// 		}
	// 	},
	// 	{
	// 		breakpoint: 480,
	// 		settings: {
	// 			slidesToShow: 1,
	// 			slidesToScroll: 1
	// 		}
	// 	},
	// 	{
	// 		breakpoint: 350,
	// 		settings: "unslick"
	// 	},
	// 	// You can unslick at a given breakpoint now by adding:
	// 	// settings: "unslick"
	// 	// instead of a settings object
	// ]
// }