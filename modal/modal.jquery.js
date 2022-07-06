$(document).ready(function () {
    const documentBody = $('body'),
        scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    /**
     * @function showModal
     * @param {string} triggerSelector 
     * @param {string} modalSelector 
     * @param {string} closeSelector 
     */
    function showModal(triggerSelector, modalSelector, closeSelector) {

        $(triggerSelector).on('click', function (e) {
            e.preventDefault();
            $(modalSelector).fadeIn();
            $(documentBody).addClass('lock').css('padding-right', scrollbarWidth);
        });
        $(modalSelector).on('click', function (e) {
            var a = $(e.target).parents('div.modal__overlay');
            if (a.length < 1) {
                $(modalSelector).fadeOut();
                $(documentBody).removeClass('lock').css('padding-right', '0');
            }
        });
        $(closeSelector).on('click', function (e) {
            $(modalSelector).fadeOut();
            $(documentBody).removeClass('lock').css('padding-right', '0');
        });

    }


    showModal('[data-modal-trigger="modal-1"]', '[data-modal="modal-1"]', '[data-modal="modal-1"] .modal__close');

    /**
     * окно "спасибо за заявку" - всплывает после отправки формы
     */
    function showThanks() {
        $('[data-modal]').fadeOut(); /** если форма была в модалке - после отправки сначала закрываем ее */
        $('[data-thanks]').fadeIn();
        $(documentBody).addClass('lock');
        setTimeout(function () {
            $('[data-thanks]').fadeOut();
            $(documentBody).removeClass('lock');
        }, 3000);
        $('[data-thanks]').on('click', function (e) {
            var a = $(e.target).parents('div.modal__overlay');
            if (a.length < 1) {
                $('[data-thanks]').fadeOut();
                $(documentBody).removeClass('lock');
            }
        });
        $('[data-thanks-close]').on('click', function (e) {
            $('[data-thanks]').fadeOut();
            $(documentBody).removeClass('lock');
        });
    }

});