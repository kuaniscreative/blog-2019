import { h_initInfiniteScroll as initInfiniteScroll } from "../animations/infiniteScroll";
import { h_scrollUpdate as scrollUpdate } from "../animations/infiniteScroll";
import { mapInput, skew } from "../animations/skew";

$(function() {
  window.shouldPreventWheel = true;
  // requestAnimationFrame setup
  (function() {
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  // scroll loop variables
  const targets = $(".ani-infiniteScroll_target");
  const parents = $(".ani-infiniteScroll_wrapper");
  const targetList = [];

  // init the targets
  for (var i = 0; i < targets.length; i++) {
    targetList.push(initInfiniteScroll(targets[i], parents[i]));
  }

  // Wheel event
  $(window).on("wheel", e => {
    if (window.shouldPreventWheel){
      e.preventDefault();
    }
    for (let [index, item] of $(targetList)
      .toArray()
      .entries()) {
      if (index % 2 === 0) {
        let curPos = $(item.parent).scrollLeft();
        curPos -= e.originalEvent.deltaY;
        $(item.parent).scrollLeft(curPos);
        scrollUpdate(item);
      } else {
        let curPos = $(item.parent).scrollLeft();
        curPos += e.originalEvent.deltaY;
        $(item.parent).scrollLeft(curPos);
        scrollUpdate(item);
      }
      $(item.parent).scroll(() => {
        e.preventDefault();
      });
    }
  });

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
        'transition': '0.5s ease',
        "color": "#eaeaea"
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
        "color": mouseEventStash[0]
      });
    $(selectionItem)
      .not(e.currentTarget)
      .children(".selectionItem_line")
      .css({
        "border-bottom": mouseEventStash[1]
      });
  }

  $(selectionItem).hover(selectionMouseEnter, selectionMouseLeave);
});
