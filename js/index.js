// /* eslint-disable no-undef */
$(document).ready(function () {
    const $body = $('body');
    const $header = $('header')
    const $main = $('main')
    const $footer = $('footer')
    $.get('/components/header.html', data => { $header.append(data) })
    $.get('/components/main/main-home.html', data => { $main.append(data) })
    $.get('/components/footer.html', data => { $footer.append(data) })

});
