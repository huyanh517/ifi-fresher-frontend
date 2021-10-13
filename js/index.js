/* eslint-disable no-undef */
$(document).ready(function () {
    const $body = $('body');
    $.get('/components/header.html', data => {$body.append(data)})
    $.get('/components/main/main-home.html', data => {$body.append(data)})
    // $.get('components/footer.html', data => {$body.append(data)})
});


