$(document).ready(function () {
    let vh = window.innerHeight;
    // =================================================
    //кнопка наверх 1
    (function () {

        $(window).on('scroll', function () {

            if ($(window).scrollTop() >= vh) {
                $('.go-top-btn-1').fadeIn();
            } else {
                $('.go-top-btn-1').fadeOut();
            }
        });
        $('.go-top-btn-1').on('click', function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });
    }());
    // =================================================
    //кнопка наверх 2
    $('body').append('<a href="#"  class="go-top-btn-2" title="Вверх">&#11014;</a>');

    $(function () {
        $.fn.scrollToTop = function () {
            $(this).hide().removeAttr("href");
            if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
            var scrollDiv = $(this);
            $(window).scroll(function () {
                if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
                else $(scrollDiv).fadeIn("slow")
            });
            $(this).click(function () {
                $("html, body").animate({ scrollTop: 0 }, "slow")
            })
        }
    });

    $(function () {
        $(".go-top-btn-2").scrollToTop();
    });

    // =================================================
});