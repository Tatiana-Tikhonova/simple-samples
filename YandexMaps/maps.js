window.addEventListener('DOMContentLoaded', function () {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init() {
        // Создание карты.
        let myMap = new ymaps.Map("map", {
            /** Координаты центра карты.
             * Порядок по умолчанию: «широта, долгота».
             * инструмент Определение координат https://yandex.ru/map-constructor/location-tool/
             */
            center: [43.48828593275171, 43.618522408073375],
            // Уровень масштабирования. Допустимые значения:от 0 (весь мир) до 19.
            zoom: 16,
            /**
             * элементы управления:стандартный набор
             * ['smallMapDefaultSet']
             * отдельные элементы:
             * ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
             * удалить все элементы управления []
             * логотип яндекса, ссылку на карты и пользовательское соглашение убирать нельзя - это криминал
             * */
            controls: ['zoomControl'],
            /**
             * полностью отключить поведение по умолчанию (зум колесиком мыши, перетаскивание левой кнопкой и тд)
             */

            // behaviors: [],
        });
        // myMap.behaviors
        //     // Отключаем часть включенных по умолчанию поведений:
        //     //  - drag - перемещение карты при нажатой левой кнопки мыши;
        //     //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
        //     .disable(['drag', 'rightMouseButtonMagnifier'])
        //     // Включаем линейку.
        //     .enable('ruler');
        /**
         * создаем метки
         */
        let pm = new ymaps.Placemark(
            //центр метки 
            [43.48828593275171, 43.618522408073375],
            {
                // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
                balloonContentHeader: '<i>Балун метки</i>',
                balloonContentBody: '<img style="width:30px; height"30px;" src="./img/01.png" alt=""> <span>Содержимое <em>балуна</em> метки</span>',
                balloonContentFooter: '<i>Подвал</i>',
                hintContent: 'Хинт метки'
            }, {
            // Подключение кастомной иконки
            // Необходимо указать тип макета иконки.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: './img/map-marker.svg',
            // Размеры метки.
            iconImageSize: [30, 30],
            // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            iconImageOffset: [-15, -30]
        }
        );
        /**
         * добавляем метку на карту
         */
        myMap.geoObjects.add(pm);
    }
    /** множественные метки */
    ymaps.ready(init2);
    // просто массив с метками
    let objects = [
        {
            latitude: 43.48828593275171,//широта
            longitude: 43.618522408073375, //долгота
            hintContent: 'Хинт метки 1',
            balloonContentHeader: '<i>Балун метки 1</i>',
            balloonContentBody: '<img style="width:30px; height"30px;" src="./img/01.png" alt=""> <span>Содержимое <em>балуна</em> метки</span>',
            balloonContentFooter: '<i>Подвал</i>',
        },
        {
            latitude: 43.50191607453408,//широта
            longitude: 43.641881500000004, //долгота
            hintContent: 'Хинт метки 2',
            balloonContentHeader: '<i>Балун метки 2</i>',
            balloonContentBody: '<img style="width:30px; height"30px;" src="./img/01.png" alt=""> <span>Содержимое <em>балуна</em> метки</span>',
            balloonContentFooter: '<i>Подвал</i>',
        },
        {
            latitude: 43.476628219305915,//широта
            longitude: 43.58112999073782, //долгота
            hintContent: 'Хинт метки 3',
            balloonContentHeader: '<i>Балун метки 3</i>',
            balloonContentBody: '<img style="width:30px; height"30px;" src="./img/01.png" alt=""> <span>Содержимое <em>балуна</em> метки</span>',
            balloonContentFooter: '<i>Подвал</i>',
        },
    ];


    function init2() {
        let myMap = new ymaps.Map("map2", {
            center: [43.48828593275171, 43.618522408073375],
            zoom: 16,
        });
        /**
         * создаем метки
         */
        // получаем метки из файла json методом XMLHttpRequest
        const req = new XMLHttpRequest();
        req.open('GET', 'objects.json', true);
        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                let res = JSON.parse(this.response);
                res.objects.forEach(function (obj) {
                    let pm = new ymaps.Placemark(
                        //центр метки 
                        [obj.latitude, obj.longitude],
                        {
                            balloonContentHeader: obj.balloonContentHeader,
                            balloonContentBody: obj.balloonContentBody,
                            balloonContentFooter: obj.balloonContentFooter,
                            hintContent: obj.hintContent,
                            iconContent: obj.iconContent
                        },
                        {
                            // Красная иконка, растягивающаяся под содержимое.
                            preset: "islands#redStretchyIcon"
                        }
                    );
                    /**
                     * добавляем метку на карту
                     */
                    myMap.geoObjects.add(pm);
                });
                // Выставляем масштаб карты чтобы были видны все метки.
                myMap.setBounds(myMap.geoObjects.getBounds());
            } else { console.log("Ошибка сервера. Номер: " + req.status); }
        };
        req.onerror = function () { console.log("Ошибка отправки запроса"); };
        req.send();


    }
    // Вывод списка объектов



    // Кластеризация
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map4', {
            center: [55.751574, 37.573856],
            zoom: 9,
            behaviors: ['default', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search'
        }),
            /**
             * Создадим кластеризатор, вызвав функцию-конструктор.
             * Список всех опций доступен в документации.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
             */
            clusterer = new ymaps.Clusterer({
                /**
                 * Через кластеризатор можно указать только стили кластеров,
                 * стили для меток нужно назначать каждой метке отдельно.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
                 */
                preset: 'islands#invertedVioletClusterIcons',
                /**
                 * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
                 */
                groupByCoordinates: false,
                /**
                 * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
                 */
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
            }),
            /**
             * Функция возвращает объект, содержащий данные метки.
             * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
             * Поле balloonContentBody - источник данных для контента балуна.
             * Оба поля поддерживают HTML-разметку.
             * Список полей данных, которые используют стандартные макеты содержимого иконки метки
             * и балуна геообъектов, можно посмотреть в документации.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
             */
            getPointData = function (index) {
                return {
                    balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
                    balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
                    balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
                    clusterCaption: 'метка <strong>' + index + '</strong>'
                };
            },
            /**
             * Функция возвращает объект, содержащий опции метки.
             * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
             */
            getPointOptions = function () {
                return {
                    preset: 'islands#violetIcon'
                };
            },
            points = [
                [55.831903, 37.411961], [55.763338, 37.565466], [55.763338, 37.565466], [55.744522, 37.616378], [55.780898, 37.642889], [55.793559, 37.435983], [55.800584, 37.675638], [55.716733, 37.589988], [55.775724, 37.560840], [55.822144, 37.433781], [55.874170, 37.669838], [55.716770, 37.482338], [55.780850, 37.750210], [55.810906, 37.654142], [55.865386, 37.713329], [55.847121, 37.525797], [55.778655, 37.710743], [55.623415, 37.717934], [55.863193, 37.737000], [55.866770, 37.760113], [55.698261, 37.730838], [55.633800, 37.564769], [55.639996, 37.539400], [55.690230, 37.405853], [55.775970, 37.512900], [55.775777, 37.442180], [55.811814, 37.440448], [55.751841, 37.404853], [55.627303, 37.728976], [55.816515, 37.597163], [55.664352, 37.689397], [55.679195, 37.600961], [55.673873, 37.658425], [55.681006, 37.605126], [55.876327, 37.431744], [55.843363, 37.778445], [55.875445, 37.549348], [55.662903, 37.702087], [55.746099, 37.434113], [55.838660, 37.712326], [55.774838, 37.415725], [55.871539, 37.630223], [55.657037, 37.571271], [55.691046, 37.711026], [55.803972, 37.659610], [55.616448, 37.452759], [55.781329, 37.442781], [55.844708, 37.748870], [55.723123, 37.406067], [55.858585, 37.484980]
            ],
            geoObjects = [];

        /**
         * Данные передаются вторым параметром в конструктор метки, опции - третьим.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
         */
        for (var i = 0, len = points.length; i < len; i++) {
            geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
        }

        /**
         * Можно менять опции кластеризатора после создания.
         */
        clusterer.options.set({
            gridSize: 80,
            clusterDisableClickZoom: true
        });

        /**
         * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
         */
        clusterer.add(geoObjects);
        myMap.geoObjects.add(clusterer);

        /**
         * Спозиционируем карту так, чтобы на ней были видны все объекты.
         */

        myMap.setBounds(clusterer.getBounds(), {
            checkZoomRange: true
        });
    });
});