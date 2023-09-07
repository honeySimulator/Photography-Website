$(document).ready(function () {
    $('.button').magnificPopup({ //по какому элементу вызывать
        items: { //что конкретно открыть
            src: 'https://www.youtube.com/watch?v=lfZmXsTBxaA'
        },
        type: 'iframe', //тип (для видео это iframe)
        iframe: { //оболочка для контента
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: { //паттерны для взятия видео
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src', //Первая часть определяет селектор CSS, вторая атрибут. «iframe_src» означает: найти «iframe» и установить атрибут «src».
        }
    });
});