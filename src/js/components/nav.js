import { requestArticle } from "../functions/spa";

const openNavBtn = $(".header_navIcon");
const closeNavBtn = $('.nav_closeIcon');
const content = $(".content");
const nav = $(".nav");
console.log(nav)

$(openNavBtn).click(e => {
    window.shouldPreventWheel = false;
    $(nav).css({
        'visibility': 'visible'
    })
});

$(closeNavBtn).click(() => {
    window.shouldPreventWheel = true;
    $(nav).css({
        'visibility': 'hidden'
    })
})

$('.nav_content a').click(() => {
    window.shouldPreventWheel = false;
})

$('.nav_toIndex a').click(() => {
    window.shouldPreventWheel = true;
})

$('.nav_toTableContent').click(() => {
    $('.nav_toAbout').toggleClass('nav_toAbout--active');
    $('.nav_toTableContent').toggleClass('nav_toTableContent--active');
    $('.mobileAbout').hide();
    $('.mobileTableContent').show();
})

$('.nav_ToAbout').click(() => {
    $('.nav_toAbout').toggleClass('nav_toAbout--active');
    $('.nav_toTableContent').toggleClass('nav_toTableContent--active');
    $('.mobileTableContent').hide();
    $('.mobileAbout').show();
})

// $(content).click((e) => {
//     e.stopPropagation();
//     if ($(content).hasClass('ani-toggleNav_content--open')) {
//         $(content).removeClass('ani-toggleNav_content--open');
//     }
// })

// test

// $('.nav_itemTitle').click((e) => {
//     const url = $(e.target).data('url');
//     requestArticle(url);
// })

// console.log(window.location.pathname);
