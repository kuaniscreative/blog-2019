import { requestArticle } from "../functions/spa";

const openNavBtn = $(".header_navIcon");
const closeNavBtn = $(".nav_closeIcon");
const content = $(".content");
const nav = $(".nav");

function navContentToggle() {
  $(".nav_area").toggleClass("navContentShow");
}

// nav animation
$(openNavBtn).click(e => {
  window.shouldPreventWheel = false;
  // index
  if ($("#indexSelection").css('display') !== 'none') {
    $("#indexSelection")
      .removeClass("ani_innerFlyCard--left")
      .addClass("ani_innerFlyCard--left")
      .one("animationend", e => {
        e.stopPropagation();
        $("#indexSelection").css("opacity", 0);
        $("body")
          .removeClass("ani_outerFlyCard--bottom")
          .addClass("ani_outerFlyCard--bottom");
        $(nav).css({
          display: "block"
        });
        navContentToggle();
        $(".ani_outerFlyCard--bottom")
          .eq(0)
          .one("animationend", () => {
            $("#indexSelection").css("opacity", 1);
            $("#indexSelection").toggleClass("ani_innerFlyCard--left");
            $("body").toggleClass("ani_outerFlyCard--bottom");
            $(".navContentShow").each((i, val) => {
              $(val).one("animationend", (e) => {
                e.stopPropagation();
                $(val).toggleClass("navContentShow");
              });
            });
          });
      });
  }
  // articles
  if ($("#article").css('display') !== 'none') {
    $(".articles_title")
      .eq(0)
      .removeClass("ani_innerFlyCard--left")
      .addClass("ani_innerFlyCard--left");
    $(".articles_content")
      .eq(0)
      .removeClass("ani_innerFlyCard--left")
      .addClass("ani_innerFlyCard--left")
      .one("animationend", e => {
        e.stopPropagation();
        $(".articles_title")
          .eq(0)
          .css("opacity", 0);
        $(".articles_content")
          .eq(0)
          .css("opacity", 0);
        $("body")
          .removeClass("ani_outerFlyCard--bottom")
          .addClass("ani_outerFlyCard--bottom");
        $(nav).css({
          display: "block"
        });
        navContentToggle();
        $(".ani_outerFlyCard--bottom")
          .eq(0)
          .one("animationend", () => {
            $(".articles_title")
              .eq(0)
              .css("opacity", 1);
            $(".articles_content")
              .eq(0)
              .css("opacity", 1);
            $(".articles_title")
              .eq(0)
              .toggleClass("ani_innerFlyCard--left");
            $(".articles_content")
              .eq(0)
              .toggleClass("ani_innerFlyCard--left");
            $("body").toggleClass("ani_outerFlyCard--bottom");
            $(".navContentShow").each((i, val) => {
              $(val).one("animationend", (e) => {
                e.stopPropagation();
                $(val).toggleClass("navContentShow");
              });
            });
          });
      });
  }
});

// close nav 
$(closeNavBtn).click(() => {
  window.shouldPreventWheel = true;
  $(nav).css({
    display: "none"
  });
});

$(".nav_content a").click((e) => {
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

// nav to articles
$('.nav_content a').click((e) => {
  $('#article').show();
  requestArticle($(e.target).data('id'));
})

// nav to index
$('.nav_toIndex').click(() => {
  
  $('#article').hide();
  $('.nav').hide();
  $('#indexSelection').show();
  window.history.pushState({}, 'index',window.location.origin);
})