(function(w, $) {
    const $graduatesSlider = $('.graduates__slider');
    const $graduatesSliderNext = $('.graduates__slider .arrow-right');
    const $graduatesSliderPrev = $('.graduates__slider .arrow-left');

    $graduatesSlider.owlCarousel({
        items: 4,
        loop: true,
        dots: false,
        nav: true,
        navContainer: '.graduates__slider-controls',
        navText: [$graduatesSliderNext, $graduatesSliderPrev],
        navClass: ['arrow-left', 'arrow-right'],
        responsive : {
            0 : {
                items: 1,
                nav: false
            },
            480 : {
                items: 2,
                nav: false
            },
            768 : {
                items: 4
            }
        }
    });
}) (window, $);