window.addEventListener('DOMContentLoaded', function () {

    function getParams(elem) {
        let obj = {
            'that': elem,
            'inner': elem.querySelector('[data-parallax="inner"]'),
            'elHt': elem.clientHeight,
            'toTop': elem.parentElement.getBoundingClientRect().top,
        };
        return obj;
    }
    function myParallax(selector, float) {
        let vh = window.innerHeight,
            elems = document.querySelectorAll(selector),
            mult = float;
        elems.forEach(function (elem, i) {
            let vars = getParams(elem);

            vars.that.style.position = 'fixed';
            vars.that.style.top = vars.toTop + 'px';
            vars.that.style.height = vars.elHt + 'px';
            vars.that.style.visibility = 'hidden';

            vars.inner.style.height = vars.elHt + (vars.elHt * mult * 2) + 'px';
            vars.inner.style.top = (-vars.toTop * mult) + 'px';

            if (vars.toTop > -vars.elHt && vars.toTop <= vh) {
                vars.that.style.top = vars.toTop + 'px';
                vars.that.style.visibility = 'visible';
            }
        });
        window.addEventListener('scroll', function (e) {
            elems.forEach(function (elem, i) {
                let vars = getParams(elem);


                if (vars.toTop > -vars.elHt && vars.toTop <= vh) {
                    vars.that.style.top = vars.toTop + 'px';
                    vars.that.style.visibility = 'visible';

                    vars.inner.style.top = (-vars.toTop * mult) + 'px';
                } else {
                    vars.that.style.top = vh + 'px';
                    vars.that.style.visibility = 'hidden';
                }
            });
        });
        /**При резайзе страницы вызываем скролл чтобы обновить все параметры */
        window.addEventListener('resize', function (e) {
            window.scrollBy(0, 1);
        });
    }
    myParallax('[data-parallax="outer"]', 0.3);
});