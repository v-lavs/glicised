/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../../node_modules/"particles.js/"particles.js
//= include ../lib/swiper/swiper-bundle.min.js


// CUSTOM SCRIPTS

$(document).ready(function () {
    //MOBILE MENU
    const nav = $('nav');
    $('.btn_burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
        $('.btn_close').show();
    });

    $('.btn_close, .menu__link, .backdrop').click(function (e) {
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
        $('.btn_close').hide();
    });

    $('.sub-menu__toggle').click(function (e) {
        $(this).toggleClass('sub-menu__toggle_active')
    });

// SMOOTH SCROLL TO ANCHOR
//     let smoothScroll = location.hash;
    const offsetSize = $("header").innerHeight();
    location.hash = '';
//     if (smoothScroll[1] != undefined) {
//         $('html, body').animate({scrollTop: $(smoothScroll).offset().top - offsetSize}, 1500);
//     }
//     ;

    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                let target = $(this.hash);
                target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - offsetSize
                    }, 2000, function () {
                        let $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex', '-1');
                            $target.focus();
                        }
                        ;
                    });
                }
            }
        });

//     //ACCORDION
    function handleAccordion(selector) {
        const firstAcc = $(selector + ' ' + '.panel__heading').get(0);

        $(selector + ' ' + '.panel__heading').on('click', function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).siblings('.panel-collapse').slideUp(500);
                $(selector + ' ' + '.panel__heading .open-panel').removeClass('open-panel').addClass('open-panel');
            } else {
                $(selector + ' ' + '.panel__heading .open-panel').removeClass('open-panel').addClass('open-panel');
                $(this).find('open-panel').removeClass('open-panel').addClass('open-panel');
                $(selector + ' ' + '.panel__heading').removeClass('open');
                $(this).addClass('open');
                $(selector + ' ' + '.panel-collapse').slideUp(500);
                $(this).siblings('.panel-collapse').slideDown(500)
            }
        });
    }

    handleAccordion('#accordion1');
    handleAccordion('#accordion2');


//    SLIDERS
    const slideSpeed = 2000;
    if ($(".banner-slider").length) {
        let bannerSlider = new Swiper(".banner-slider", {
            loop: true,
            autoplay: true,
            effect: "fade",
            speed: slideSpeed,

            on: {
                afterInit: function () {
                    const currSlide = this.slides[this.activeIndex];
                    $(currSlide).addClass('animated');
                },
                slideChange: function () {
                    const currSlide = this.slides[this.activeIndex];
                    $(currSlide).addClass('animated');

                    setTimeout(() => {
                        $('.banner-slider__slide:not(.swiper-slide-active)').removeClass('animated');
                    }, slideSpeed);
                }
            }
        });
    }


    if ($(".consequent-slider").length) {
        let consequentSlider = new Swiper(".consequent-slider", {
            slidesPerView: 'auto',
            slidesOffsetAfter: 100,
            loop:false,
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: "#js_bn",
                prevEl: "#js_bp",
            },

        });
    }
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
});

