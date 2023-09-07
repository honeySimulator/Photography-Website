$(document).ready(function() {
// Swiper: Slider
    new Swiper('.swiper-container', { // создаем
        loop: true, //цикличность галереи
        slidesPerView: 3, //сколько максимально видим слайдов
        paginationClickable: true,
        spaceBetween: 20, //расстояние м/ду ними
        breakpoints: { //адаптация под мобильные устройства
            1920: {
                slidesPerView: 3, //кол-во видимых карточек
                spaceBetween: 30 //расстояние м/ду ними
            },
            1028: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });
});
