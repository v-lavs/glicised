/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../../node_modules/"particles.js/"particles.js
//= include ../lib/swiper/swiper-bundle.min.js


// CUSTOM SCRIPTS

$(document).ready(function () {
    $('.js-default-prevented').click(function (e) {
        e.preventDefault();
    });

    //MOBILE MENU
    const nav = $('nav');
    $('.btn_burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        $('.dropdown').removeClass('active');
        jQuery('.backdrop').fadeIn();
        $('.btn_close').show();
    });

    $('.btn_close, .sub-menu__item a, .menu__link:not(.js-default-prevented), .backdrop').click(function (e) {
        nav.removeClass('open');
        $('.dropdown').removeClass('active');
        jQuery('.backdrop').fadeOut();
        $('.btn_close').hide();
    });

    $('.header .dropdown').click(function (e) {
        $(e.currentTarget).toggleClass('active');
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

    if ($(".consequent-slider").length) {
        let consequentSlider = new Swiper(".consequent-slider", {
            slidesPerView: 1,
            loop: false,
            speed: 1500,
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: "#js_bn",
                prevEl: "#js_bp",
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    slidesOffsetAfter: 100,
                }
            }

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


    if (($(window).outerWidth() > 768) && $("#particles-js").length) {
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

        $(document).on('change', $options, function (e) {
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
                if (typeof answers[currStep] === 'number') {
                    $('[name="quiz-radio"][value=' + answers[currStep] + ']').prop('checked', true);
                }
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
            $next_btn.attr('disabled', false);
        });

        function showQuestion(number) {
            const questionIndex = number - 1;
            const questionData = QUIZ_QUESTIONS[questionIndex];
            if (questionData) {
                $question_text.text(questionData.title);
                $curr_step.text(number);

                const answers = $('<div></div>');

                questionData.answers.forEach(item => {
                    const el = $('<div></div>');
                    const optionHtml = `
                        <label class="radio">
                            <input value="${item.value}" name="quiz-radio" type="radio">

                            <span class="radio__text">${item.label}</span>
                        </label>
                    `;
                    el.html(optionHtml);
                    $(answers).append(el);
                });
                $('#quiz-options').html(answers);
            }
            if (number === 1) {
                $prev_btn.attr('disabled', 'disabled');
            } else {
                $prev_btn.attr('disabled', false)
            }

            if (typeof answers[number] !== 'number') {
                $next_btn.attr('disabled', 'disabled');
            }
        }

        function showResult() {
            const finalScore = Object.values(answers).reduce(function (acc, prev) {
                return prev + acc
            }, 0);
            const level = QUIZ_RESULT_THRESHOLD.find(el => el.maxScore >= finalScore) || QUIZ_RESULT_THRESHOLD[0];

            const offset = finalScore * 100 / (QUIZ_QUESTIONS.length * 4) || 0;
            const res = $('<div></div>');
            const score = $('<div></div>').text(finalScore);
            const label = $('<div class="quiz-result-text"></div>').text(level.label);

            res.append(score).append(label);
            $result.html(res);

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

// Slider with mask
    const slider = document.querySelector('.banner-slider');

        if (slider) {
            const sliderTimeout = 5000;

            // slides informations
            const slidesDefault = document.querySelectorAll(".banner-slider .banner-slider__slide");

            slidesDefault.forEach(item => {
                const clonedItem = item.cloneNode(true);
                slider.appendChild(clonedItem);
            });

            let slides = document.querySelectorAll(".banner-slider .banner-slider__slide");

            function moveSlide(e) {
                const currSlideIndex = [].slice.call(slides).findIndex(s => s.classList.contains('active-slide'));
                const slide = slides[currSlideIndex + 1];
                const prevSlide = slides[currSlideIndex - 1];

                if (prevSlide) {
                    const cloned = prevSlide.cloneNode(true);
                    cloned.classList.remove('slide-on');
                    prevSlide.remove();
                    slider.appendChild(cloned);
                    slides = document.querySelectorAll(".banner-slider .banner-slider__slide")
                }

                $(slides).removeClass('active-slide');

                slide.classList.add("slide-on");
                slide.classList.add("active-slide");
            }

            function startSlider() {
                slides[0].classList.add('active-slide');
                slides[0].classList.add("slide-on");

                setInterval(() => {
                    moveSlide();
                }, sliderTimeout);
            }

            startSlider();
        }

    // POPUP-CONTACTS
    $('.popup-trigger').click(function (e) {
        e.preventDefault();
        $('#popupContacts').fadeIn();
        $('.backdrop').fadeIn();
        $('body').addClass('modal_open');
    })

    $('#closePopup,  .backdrop').click(function () {
        $('#popupContacts').fadeOut();
        $('.backdrop').fadeOut();
        $('body').removeClass('modal_open');
    });

    // banner anim
    setTimeout(() => {
        $('.section-banner .anim-up').addClass('anim-active');
        $('.section-banner .anim-right').addClass('anim-active');
        $('.section-banner .card__icon').addClass('anim-active');
        $('.section-banner .section-banner__slogan .line').addClass('anim-active');
        setTimeout(() => {
            $('.section-banner .slider-btn').addClass('anim-active');
        }, 600);
    }, 1000);

});

