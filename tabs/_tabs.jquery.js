$(document).ready(function () {

    // =============================================
    function toggleTabs(tabsSelector, tabTrigger, singleTab) {
        const tabsContainer = $(tabsSelector);

        if (tabsContainer.length > 0) {
            const tabsBtns = $(tabTrigger),
                tabs = $(singleTab);
            tabsContainer.on('click', function (e) {
                if ($(e.target).hasClass(tabTrigger.substring(1))) {
                    tabsBtns.removeClass('active');
                    $(e.target).addClass('active');
                    tabs.removeClass('active');
                    tabs.eq($(e.target).index()).addClass('active');
                }
            });
        }

    }
    toggleTabs('.tabs', '.tabs__btn', '.tabs__item');
    // =============================================
});