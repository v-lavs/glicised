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

    $('.dropdown').click(function (e) {
        $(this).find($('.sub-menu')).toggleClass('show');
        $('.menu__link').toggleClass('active');
    });


// SMOOTH SCROLL TO ANCHOR
    let smoothScroll = location.hash;
    const offsetSize = $("header").innerHeight();
    location.hash = '';
    if ($(smoothScroll).length > 0) {
        $('html, body').animate({scrollTop: $(smoothScroll).offset().top - offsetSize}, 1500);
    }


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

                    });
                }
            }
        });


//    SLIDERS
    if ($(".banner-slider").length) {
              // let bannerSlider = new Swiper(".banner-slider", {
        //     autoplay: {
        //         delay: 5000,
        //     },
        //     loop: true,
        //     effect: 'fade',
        // });

        // slides informations
        const slides = document.querySelectorAll(".banner-slider .banner-slider__slide"),
            slidesLength = slides.length;

        // slides array
        const slidesArr = [].slice.call(slides);


        // slide current
        let slideCurrent = -1;

        function moveSlide(e) {
            // get next button

            prevSlide = slidesArr[slideCurrent - 1];
            slide = slidesArr[slideCurrent];

            if (prevSlide) {
                setTimeout(() => {
                    // prevSlide.classList.remove('slide-on');
                }, 0);
            }

            slide.classList.add("slide-on");


            if (slideCurrent === slidesLength - 1) {

            }
        }

        setInterval(() => {
            slideCurrent++;
            moveSlide();
        }, 3000);
    }


    if ($(".consequent-slider").length) {
        let consequentSlider = new Swiper(".consequent-slider", {
            slidesPerView: 'auto',
            slidesOffsetAfter: 100,
            loop: false,
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


    if ($(".article-slider").length) {
        let articleSlider = new Swiper(".article-slider", {
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }


    if ($("#particles-js").length) {
        particlesJS.load('particles-js', 'assets/particlesjs-config.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }


    // QUIZ
    const $quizWrap = $('#quiz');

    if ($quizWrap.length > 0) {
        const $form = $('.quiz');
        const $quizPreview = $('.quiz-preview');
        const $curr_step = $('.quiz__current-step');
        const $total_step = $('.quiz__total_step');
        const $question_text = $('.quiz__question-sub-title');
        const $result = $('#quiz-result');
        const $resultView = $('.quiz-result-view');
        const $options = $($form.find('[name*="quiz-radio"]'));
        const $start_btn = $('#quiz-start');
        const $prev_btn = $('#quiz-prev');
        const $next_btn = $('#quiz-next');
        const $pointer = $('.scale-pointer');

        let answers = {};
        let currStep = 0;

        $options.on('change', function (e) {
            $next_btn.attr('disabled', false);
            answers = Object.assign(answers, {[currStep]: Number(e.target.value)});
        });

        $start_btn.on('click', function (e) {
            e.preventDefault();
            currStep = 1;

            $quizPreview.addClass('hidden');
            $form.removeClass('hidden');

            $curr_step.text(currStep);
            $total_step.text(QUIZ_QUESTIONS.length);

            showQuestion(currStep);
        });

        $next_btn.on('click', function (e) {
            e.preventDefault();
            if (currStep < QUIZ_QUESTIONS.length) {
                ++currStep;
                showQuestion(currStep);
            } else {
                showResult();
            }
        });

        $prev_btn.on('click', function (e) {
            e.preventDefault();
            if (currStep > 1) {
                --currStep;
                showQuestion(currStep);
                $('[name="quiz-radio"][value=' + answers[currStep] + ']').prop('checked', true);
            }
        });

        function showQuestion(number) {
            const questionIndex = number - 1;
            const questionData = QUIZ_QUESTIONS[questionIndex];
            if (questionData) {
                $question_text.text(questionData.title);
                $curr_step.text(number);
                clearOptionsValue();
            }
            if (number === 1) {
                $prev_btn.attr('disabled', 'disabled');
            } else {
                $prev_btn.attr('disabled', false)
            }
            if (!answers[questionIndex]) {
                $next_btn.attr('disabled', 'disabled');
            }
        }

        function showResult() {
            const finalScore = Object.values(answers).reduce(function (acc, prev) {
                return prev + acc
            }, 0);

            const offset = finalScore * 100 / (QUIZ_QUESTIONS.length * 4) || 0;
            $result.html(`${finalScore}`);

            $form.addClass('hidden');
            $resultView.removeClass('hidden');

            clearOptionsValue();
            currStep = 0;

            $pointer.animate({left: Math.max(offset, offset + 2) + "%"}, 1000).animate({left: Math.max(0, offset - 4) + "%"}, 300).animate({left: offset + "%"}, 400);
        }

        function clearOptionsValue() {
            $options.prop('checked', false);
        }
    }
});

