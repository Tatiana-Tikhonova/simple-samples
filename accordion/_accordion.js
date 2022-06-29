window.addEventListener('DOMContentLoaded', function () {
    // =============================================
    function bindAccordion(itemSelector, triggerSelector) {
        const accItems = document.querySelectorAll(itemSelector);
        if (accItems.length > 0) {
            accItems.forEach(function (el, i) {
                el.addEventListener('click', function (e) {
                    let panel = this.lastElementChild;
                    if (e.target.classList.contains(triggerSelector.substring(1)) ||
                        e.target.parentElement.classList.contains(triggerSelector.substring(1))) {
                        this.classList.toggle('opened');
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                        } else {
                            panel.style.maxHeight = panel.scrollHeight * 2 + "px";
                        }
                        //если надо при открытии элемента закрывать остальные
                        // for (let index1 = 0; index1 < accItems.length; index1++) {
                        //     let item = accItems[index1];
                        //     if (item != this && item.classList.contains('opened')) {
                        //         item.classList.remove('opened');
                        //         item.lastElementChild.style.maxHeight = null;
                        //     }
                        // }
                    }

                });
            });

        }

    }
    bindAccordion('.accordion-item', '.accordion-item__button');
    // =============================================
});