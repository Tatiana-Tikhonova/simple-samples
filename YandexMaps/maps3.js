window.addEventListener('DOMContentLoaded', function () {
    ymaps.ready(init3);
    function init3() {
        let myMap = new ymaps.Map("map3", {
            center: [59.95222712883534, 30.338543526275604],
            zoom: 10,

        });
        /**
        * создаем метки
        */

        // получаем метки из файла json методом XMLHttpRequest
        const req = new XMLHttpRequest();
        req.open('GET', 'points.json', true);
        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                let res = JSON.parse(this.response);
                setLinks(res.points);
                res.points.forEach(function (group, i) {
                    let collection = new ymaps.GeoObjectCollection(null, { preset: group.style });
                    group.items.forEach(function (item) {
                        let marker = new ymaps.Placemark(item.center, { preset: group.style });
                        collection.add(marker);
                        marker.events
                            .add('mouseenter', function (e) {
                                e.get('target').options.set('preset', 'islands#redDotIcon');
                            })
                            .add('mouseleave', function (e) {
                                e.get('target').options.unset('preset');
                            })
                            .add('click', function (e) {
                                console.log(e.get('target'));

                                myMap.setCenter(e.get('target').geometry._coordinates, 16);
                                addRoute(e.get('target').geometry._coordinates);
                            });

                    });
                    myMap.geoObjects.add(collection);
                    bindLinks(collection, i);
                });
                myMap.setBounds(myMap.geoObjects.getBounds());
            } else { console.log("Ошибка сервера. Номер: " + req.status); }
        };
        req.onerror = function () { console.log("Ошибка отправки запроса"); };
        req.send();


        function setLinks(groups) {
            let list = document.createElement('ul');
            list.setAttribute('class', 'map-links');
            groups.forEach(function (group, i) {
                let listItem = document.createElement('li');
                listItem.setAttribute('class', 'map-links__item');
                listItem.innerHTML = `<h3>${group.name}</h3>`;
                let submenu = document.createElement('ul');
                submenu.setAttribute('class', 'map-links__submenu');
                submenu.setAttribute('id', 'group' + i);
                listItem.appendChild(submenu);
                list.appendChild(listItem);
                group.items.forEach(function (item) {
                    let listItem = document.createElement('li');
                    listItem.setAttribute('class', 'map-links__submenu-item map-item');
                    listItem.innerHTML = `
                    <div class="map-item__content">
                        <h4 class="map-item__address">${item.address}</h4>
                        <p class="map-item__time">Режим работы: ${item.time}</p>
                        <p class="map-item__tel">Тел: ${item.tel}</p>
                        <p class="map-item__links">
                            <a href="https:/${item.site}">${item.site}</a>
                            <a href="mailto:${item.email}">${item.email}</a>
                        </p>
                    </div>
                    `;
                    submenu.appendChild(listItem);
                });
            });

            let cnt = document.querySelector('#map3 + .map-links');
            cnt.appendChild(list);

        }
        function bindLinks(collection, i) {
            let links = document.querySelectorAll('#group' + i + ' .map-item');
            let linksForStyle = document.querySelectorAll('.map-item');
            let result = ymaps.geoQuery(collection).searchIntersect(myMap);

            links.forEach(function (el, j) {
                let item = result.get(j);
                // при наведении на адрес перекрашиваем метку
                el.addEventListener('mouseover', function (e) {
                    if (e.target.classList.contains('map-item') || e.target.closest('.map-item')) {
                        item.options.set('preset', 'islands#redDotIcon');
                    } else {
                        item.options.set('preset', '');
                    }
                });
                el.addEventListener('mouseleave', function (e) {
                    if (e.target.classList.contains('map-item') || e.target.closest('.map-item')) {
                        item.options.set('preset', '');
                    }

                });
                /**
                 * по клику на пункт меню передвигаем карту так, чтобы метка 
                 * выбранного пункта была в центре и увеличиваем зум
                 * и выделяем кликнутый пункт меню
                 */
                el.addEventListener('click', function (e) {
                    if (e.target.classList.contains('map-item') || e.target.closest('.map-item')) {
                        myMap.setCenter(item.geometry._coordinates, 16);
                        linksForStyle.forEach(function (link, i) {
                            if (link.classList.contains('active')) {
                                link.classList.remove('active');
                            }
                        });
                        e.currentTarget.classList.add('active');
                        addRoute(item.geometry._coordinates);
                    }

                });

            });
        }
        /**
         * подключение панели построения маршрута при клике на пункт меню или метку на карте
         * @param {*} coords 
         */
        function addRoute(coords) {
            myMap.controls.add('routePanelControl');
            let control = myMap.controls.get('routePanelControl');
            // Задание состояния для панели маршрутизации.
            control.routePanel.state.set({
                // Адрес начальной точки.
                from: '',
                // Адрес конечной точки.
                to: coords
            });
        }

    }

});