window.addEventListener('DOMContentLoaded', function () {
    // =============================================
    function toggleTabs(tabsSelector, tabTrigger, singleTab) {
        const tabsContainer = document.querySelector(tabsSelector);
        if (tabsContainer) {
            const tabsBtns = tabsContainer.querySelectorAll(tabTrigger),
                tabs = tabsContainer.querySelectorAll(singleTab);

            tabsContainer.addEventListener('click', function (e) {
                if (e.target.classList.contains(tabTrigger.substring(1))) {
                    tabsBtns.forEach(function (btn) {
                        btn.classList.remove('active');
                    });
                    tabs.forEach(function (tab) {
                        tab.classList.remove('active');
                    });
                    for (let i = 0; i < tabsBtns.length; i++) {
                        if (e.target == tabsBtns[i]) {
                            tabsBtns[i].classList.add('active');
                            tabs[i].classList.add('active');
                        }
                    }
                }
            });
        }
    }
    toggleTabs('.tabs', '.tabs__btn', '.tabs__item');
    // =============================================
});