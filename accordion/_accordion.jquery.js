$(document).ready(function () {
    // =============================================
    function bindAccordion(itemSelector, triggerSelector) {
        const accItems = $(itemSelector);
        if (accItems.length > 0) {
            accItems.on('click', function (e) {
                // $(this).toggleClass('opened').find(triggerSelector).next().slideToggle();
                //если надо при открытии элемента закрывать остальные
                if ($(this).hasClass('opened')) {
                    $(this).removeClass('opened').find(triggerSelector).next().slideUp();

                }
                else {
                    $(this).addClass('opened').find(triggerSelector).next().slideDown();
                    $(this).siblings('.opened').removeClass('opened').find(triggerSelector).next().slideUp();
                }
            });
        }
    }
    bindAccordion('.accordion-item', '.accordion-item__button');
    // =============================================
});