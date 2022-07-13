window.addEventListener('DOMContentLoaded', function () {
    function getDataXHR(url) {


    }
    async function getDataFetch(url, data) {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could nit fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    function showMore(trigger, container) {
        const btn = document.querySelector(trigger);
        //подгрузка из json файла
        btn.addEventListener('click', function () {
            // получаем данные методом fetch
            // getDataFetch('data.json')
            //     .then(function (res) { createCards(res.cards); })
            //     .catch(function (error) { console.log(error); });

            // получаем данные методом XMLHttpRequest
            const req = new XMLHttpRequest();
            req.open('GET', 'data.json', true);
            req.onload = function () {
                if (req.status >= 200 && req.status < 400) {
                    let res = JSON.parse(this.response);
                    createCards(res.cards);
                } else { console.log("Ошибка сервера. Номер: " + req.status); }
            };
            req.onerror = function () { console.log("Ошибка отправки запроса"); };
            req.send();
            btn.remove();
        });
        function createCards(response) {
            response.forEach(function ({ src, title, text, link }) {
                let card = document.createElement('div');
                card.classList.add('cards__item', 'card', 'fadeInUp');
                card.innerHTML = `
                <img src=${src} alt="">
                <h2 class="card__title">${title}</h2>
                <p class="card__text">${text}</p>
                <a class="card__link button" href="${link}">Подробнее</a>
                `;
                document.querySelector(container).appendChild(card);
            });
        }
    }
    showMore('.cards__btn', '.cards__row');
});