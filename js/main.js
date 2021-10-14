$(document).ready(function () {
    $(window).scroll(scrollTop)
});

function scrollTop() {
    let windowHeight = $(window).scrollTop()

    if (windowHeight > 250) {
        $('.btn-scroll').css('opacity', '1')
    } else {
        $('.btn-scroll').css('opacity', '0')
    }

    $('.btn-scroll').click(() => {
        $(document.documentElement).animate({
            scrollTop: 0
        }, 500)
        console.log('Test')
        return false
    })
}