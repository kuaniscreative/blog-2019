import { requestArticle } from "../functions/spa";

const openNavBtn = $(".header_navIcon");
const closeNavBtn = $(".nav_closeIcon");
const content = $(".content");
const nav = $(".nav");

$(openNavBtn).click(e => {
  window.shouldPreventWheel = false;
  $("#indexSelection")
    .removeClass("ani_innerFlyCard--left")
    .addClass("ani_innerFlyCard--left")
    .one("animationend", e => {
      e.stopPropagation();
      $("#indexSelection").css('opacity', 0);
      $("body").removeClass("ani_outerFlyCard--bottom").addClass("ani_outerFlyCard--bottom");
      $(nav).css({
        display: "block"
      });
      $(".ani_outerFlyCard--bottom").eq(0).one("animationend", () => {
        $('#indexSelection').css('opacity', 1);
        $("#indexSelection").toggleClass("ani_innerFlyCard--left");
        $("body").toggleClass("ani_outerFlyCard--bottom");
      });
    });
  
});

$(closeNavBtn).click(() => {
  window.shouldPreventWheel = true;
  $(nav).css({
    display: "none"
  });
});

$(".nav_content a").click(() => {
  window.shouldPreventWheel = false;
});

$(".nav_toIndex a").click(() => {
  window.shouldPreventWheel = true;
});

$(".nav_toTableContent").click(() => {
  $(".nav_toAbout").toggleClass("nav_toAbout--active");
  $(".nav_toTableContent").toggleClass("nav_toTableContent--active");
  $(".mobileAbout").hide();
  $(".mobileTableContent").show();
});

$(".nav_ToAbout").click(() => {
  $(".nav_toAbout").toggleClass("nav_toAbout--active");
  $(".nav_toTableContent").toggleClass("nav_toTableContent--active");
  $(".mobileTableContent").hide();
  $(".mobileAbout").show();
});

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
