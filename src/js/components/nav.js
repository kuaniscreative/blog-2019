import { requestArticle } from "../functions/spa";

const openNavBtn = $(".header_navIcon");
const closeNavBtn = $('.nav_closeBtn');
const content = $(".content");
const nav = $(".nav");
console.log(nav)

$(openNavBtn).click(e => {

    $(nav).css({
        'visibility': 'visible'
    })
});

$(closeNavBtn).click(() => {
    $(nav).css({
        'visibility': 'hidden'
    })
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
