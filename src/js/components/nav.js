import { requestArticle } from '../functions/spa';

const toggleNavBtn = $('.sideMenu_button');
const content = $('.content');

$(toggleNavBtn).click((e) => {
    e.stopPropagation();
    $(content).addClass('ani-toggleNav_content--open');
});


$(content).click((e) => {
    e.stopPropagation();
    if ($(content).hasClass('ani-toggleNav_content--open')) {
        $(content).removeClass('ani-toggleNav_content--open');
    }
})

// test

$('.nav_itemTitle').click((e) => {
    const url = $(e.target).data('url');
    requestArticle(url);
})

console.log(window.location.pathname);