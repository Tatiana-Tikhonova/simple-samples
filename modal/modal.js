window.addEventListener('DOMContentLoaded', function () {
    const documentBody = document.body,
        scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    /**
     * @function showModal
     * @param {string} triggerSelector 
     * @param {string} modalSelector 
     * @param {string} closeSelector 
     */
    function showModal(triggerSelector, modalSelector, closeSelector, display = 'flex') {
        const modalTrigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            overlay = modal.firstElementChild,
            close = modal.querySelectorAll(closeSelector);
        modalTrigger.forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                modal.style.display = display;
                overlay.classList.add('modal__overlay_fadeIn');
                documentBody.classList.add('lock');
                documentBody.style.paddingRight = scrollbarWidth + 'px';
            });
        });
        close.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                if (e.target == e.currentTarget) {
                    overlay.classList.remove('modal__overlay_fadeIn');
                    overlay.classList.add('modal__overlay_fadeOut');
                    setTimeout(function () {
                        overlay.classList.remove('modal__overlay_fadeOut');
                        modal.style.display = 'none';
                        documentBody.classList.remove('lock');
                        documentBody.style.paddingRight = '';
                    }, 300);
                }
            });
        });
    }
    showModal('[data-modal-trigger="modal-1"]', '[data-modal="modal-1"]', '[data-modal-close="modal-1"]');
    /**
     * окно "спасибо за заявку" - всплывает после отправки формы
     */
    function showThanks() {
        const formModal = document.querySelectorAll('[data-modal]'),
            thanks = document.querySelector('[data-thanks]'),
            overlay = thanks.firstElementChild,
            close = thanks.querySelectorAll('[data-thanks-close]');
        if (formModal.length > 0) {
            /** сначала закрываем все открытые окна */
            formModal.forEach(function (modal) {
                let overlay = modal.firstElementChild;
                overlay.classList.remove('modal__overlay_fadeIn');
                overlay.classList.add('modal__overlay_fadeOut');
                setTimeout(function () {
                    overlay.classList.remove('modal__overlay_fadeOut');
                    modal.style.display = 'none';
                    documentBody.classList.remove('lock');
                    documentBody.style.paddingRight = '';
                }, 300);
            });
            /** показываем всплывашку 3 сек и закрываем */
            thanks.style.display = 'block';
            overlay.classList.add('modal__overlay_fadeIn');
            documentBody.classList.add('lock');
            documentBody.style.paddingRight = scrollbarWidth + 'px';
            setTimeout(function () {
                overlay.classList.remove('modal__overlay_fadeIn');
                overlay.classList.add('modal__overlay_fadeOut');
                setTimeout(function () {
                    overlay.classList.remove('modal__overlay_fadeOut');
                    thanks.style.display = 'none';
                    documentBody.classList.remove('lock');
                    documentBody.style.paddingRight = '';
                }, 300);
            }, 3000);
            /** закрытие по клику*/
            close.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (e.target == e.currentTarget) {
                        overlay.classList.remove('modal__overlay_fadeIn');
                        overlay.classList.add('modal__overlay_fadeOut');
                        setTimeout(function () {
                            overlay.classList.remove('modal__overlay_fadeOut');
                            thanks.style.display = 'none';
                            documentBody.classList.remove('lock');
                            documentBody.style.paddingRight = '';
                        }, 300);
                    }
                });
            });
        }
    }
    /**
     * фиксированное окно - всплывает через 3 сек после загрузки страницы или при клике по триггеру 
     * закрывается через 3 сек или по клику
     * @function showFixedModal
     * @param {string} triggerSelector 
     * @param {string} modalSelector 
     * @param {string} closeSelector 
     * @param {number} delay 
     * @param {number} duration 
     */
    function showFixedModal(triggerSelector, modalSelector, closeSelector, delay = 3000, duration = 3000) {
        const modalTrigger = document.querySelector(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = modal.querySelector(closeSelector);
        setTimeout(function () {
            modal.classList.add('fixed-modal_visible');
            setTimeout(function () {
                modal.classList.remove('fixed-modal_visible');
            }, duration);
        }, delay);
        modalTrigger.addEventListener('click', function (e) {
            modal.classList.add('fixed-modal_visible');
        });
        close.addEventListener('click', function (e) {
            modal.classList.remove('fixed-modal_visible');
        });

    }
    showFixedModal('[data-modal-trigger="modal-fixed"]', '[data-modal="modal-fixed"]', '[data-modal-close="modal-fixed"]', 1000, 2000);
});
