$(document).ready(function () {

    function showMore(trigger, container) {
        $(trigger).on('click', function (event) {
            //подгрузка из json файла
            $.getJSON("data.json", function (res) {
                createCards(res.cards);
            })
                .fail(function (e) { console.log(e.status, e.statusText); })
                .done(function () { $(trigger).remove(); });
            function createCards(response) {
                for (let i = 0; i < response.length; i++) {
                    const el = response[i];
                    let card = `
                    <div class="cards__item card fadeInUp">
                        <img src="${el.src}" alt="" class="card__img">
                        <h2 class="card__title">${el.title}</h2>
                        <p class="card__text">${el.text}</p>
                        <a href="${el.link}" class="card__link button">Подробнее</a>
                    </div>`;
                    $(container).append(card);
                }
            }
        });

    }
    showMore('.cards__btn', '.cards__row');

});