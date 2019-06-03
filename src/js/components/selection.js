import { h_initInfiniteScroll as initInfiniteScroll } from "../animations/infiniteScroll";
import { h_scrollUpdate as scrollUpdate } from "../animations/infiniteScroll";
import { requestArticle } from "../functions/spa";

$(function() {
  window.shouldPreventWheel = true;

  // scroll loop variables
  const targets = $(".ani-infiniteScroll_target");
  const parents = $(".ani-infiniteScroll_wrapper");
  const targetList = [];

  // init the targets
  for (var i = 0; i < targets.length; i++) {
    targetList.push(initInfiniteScroll(targets[i], parents[i]));
  }

  // init the targets if landing on article pages
  $(".nav_toIndex").one("click", () => {
    for (var i = 0; i < targets.length; i++) {
      targetList[i] = initInfiniteScroll(targets[i], parents[i]);
    }
  });

  // reCal if size change
  $(window).resize(() => {
    for (var i = 0; i < targets.length; i++) {
      targetList[i] = initInfiniteScroll(targets[i], parents[i]);
    }
  });

  // Wheel event for index scroll

  function preventIndexScrollDefault() {
    const navDisplay = $(".nav").eq(0).css("display");
    const articleDisplay = $("#article").css("display");
    const indexDisplay = $('#indexSelection').css('display');

    if ( navDisplay === 'none' && articleDisplay === 'none' && indexDisplay === 'block') {
      console.log('wtf')
      return true
    }
    return false
  }

  $(window).on("wheel", e => {
    for (let [index, item] of $(targetList)
      .toArray()
      .entries()) {
      if (index % 2 === 0) {
        if (preventIndexScrollDefault()) {
          e.preventDefault();
        }
        let curPos = $(item.parent).scrollLeft();
        curPos -= e.originalEvent.deltaY;
        $(item.parent).scrollLeft(curPos);
        scrollUpdate(item);
      } else {
        if (preventIndexScrollDefault()) {
          e.preventDefault();
        }
        let curPos = $(item.parent).scrollLeft();
        curPos += e.originalEvent.deltaY;
        $(item.parent).scrollLeft(curPos);
        scrollUpdate(item);
      }
    }
  });


  // make it scroll when landing on index selection
  const cubicBezier = "cubic-bezier(.14,.88,.86,1.01)";
  
  function manualScroll() {
      const amount = 700;
      const negAmount = "14700px"
      const duration = 1000;

      for (let [index, item] of $(targetList)
        .toArray()
        .entries()) {
        if (index % 2 === 0) {
          scrollUpdate(item);
          $(item.parent).animate({scrollLeft: `-=${amount}`}, duration);
          scrollUpdate(item);
        } else {
          $(item.parent).animate({scrollLeft: `+=${amount}`}, duration);
          scrollUpdate(item);
        }
      }
  } 
  manualScroll();

  
  // hover effect
  const selectionItem = $(".selectionItem");
  let mouseEventStash = [];

  function selectionMouseEnter(e) {
    mouseEventStash.push(
      $(selectionItem)
        .not(e.currentTarget)
        .children()
        .css("color")
    );
    mouseEventStash.push(
      $(selectionItem)
        .not(e.currentTarget)
        .children(".selectionItem_line")
        .css("border-bottom")
    );
    $(selectionItem)
      .not(e.currentTarget)
      .children()
      .css({
        transition: "0.5s ease",
        color: "#eaeaea"
      });
    $(selectionItem)
      .not(e.currentTarget)
      .children(".selectionItem_line")
      .css({
        "border-bottom": "2px solid #eaeaea"
      });
  }

  function selectionMouseLeave(e) {
    $(selectionItem)
      .not(e.currentTarget)
      .children()
      .css({
        color: mouseEventStash[0]
      });
    $(selectionItem)
      .not(e.currentTarget)
      .children(".selectionItem_line")
      .css({
        "border-bottom": mouseEventStash[1]
      });
  }

  $(selectionItem).hover(selectionMouseEnter, selectionMouseLeave);

  // request article
  $(".selectionItem").click(e => {
    const id = $(".selectionItem").data("id");
    e.stopPropagation();
    $("#article").show();
    $(".footer").hide();
    requestArticle(id);
  });
});
