$(document).ready(function () {



  function getParams(elem) {
    let obj = {
      'that': $(elem),
      'inner': $(elem).find('[data-parallax="inner"]'),
      'offset': $(elem).parent().offset().top,
      'elHt': $(elem).parent().innerHeight(),
      'toTop': $(elem).parent().offset().top - $(window).scrollTop(),
    };
    return obj;
  }

  function myParallax(selector, float) {
    let vh = $(window).height(),
      elems = $(selector),
      mult = float;
    elems.each(function (i) {
      let vars = getParams($(this));
      vars.that.css({
        'position': 'fixed',
        'top': vars.toTop + 'px',
        'height': vars.elHt + 'px',
        'visibility': 'hidden'
      });

      vars.inner.css({
        'height': vars.elHt + (vars.elHt * mult * 2) + 'px',
        'top': (-vars.toTop * mult) + 'px',
      });
      if ($(window).scrollTop() > vars.offset - vh && $(window).scrollTop() < vars.offset + vars.elHt) {
        vars.that.css({
          'top': vars.toTop + 'px',
          'visibility': 'visible'
        });
      }
    });
    $(window).on('scroll', function (e) {
      elems.each(function (i) {
        let vars = getParams($(this));
        /** элемент в окне просмотра */
        if ($(window).scrollTop() > vars.offset - vh && $(window).scrollTop() < vars.offset + vars.elHt) {
          vars.that.css({
            'top': vars.toTop + 'px',
            'visibility': 'visible'
          });
          vars.inner.css({
            'top': (-vars.toTop * mult) + 'px',
          });
        }
        else {
          vars.that.css({
            'top': vh + 'px',
            'visibility': 'hidden'
          });
        }

      });
    });
  }
  myParallax('[data-parallax="outer"]', 0.3);


});