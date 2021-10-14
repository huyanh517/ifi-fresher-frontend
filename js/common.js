$(document).ready(() => {
    //SLIDER
    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        mouseDrag: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
        }
    })

    // MOBILE MENU
    $('.button').click(() => {
        if ($('.menu-left').hasClass('open')) {
            $('.menu-left').removeClass('open')
            $('.menu-left').addClass('close')
        } else {
            $('.menu-left').removeClass('close')
            $('.menu-left').addClass('open')
        }
    })

    function checkWidth() {
        let windowSize = $(window).width()
        if (windowSize > 767) {
            $('.menu-left').removeClass('close')
            $('.menu-left').addClass('open')
        } else {
            $('.menu-left').removeClass('open')
        }
    }
    checkWidth()
    $(window).resize(checkWidth)

    // HEADER SCROLL
    $(window).scroll(checkHeight)

    function checkHeight() {
        let windowHeight = $(window).scrollTop()
        if (windowHeight > 210) {
            $('.header__top').css('position', 'fixed')
        } else {
            $('.header__top').css({
                'position': 'sticky',
                'z-index': 200,
                'top': 0
            })
        }
    }
})
