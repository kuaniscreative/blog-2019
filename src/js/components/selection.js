import { h_initInfiniteScroll as initInfiniteScroll } from "../animations/infiniteScroll";
import { h_scrollUpdate as scrollUpdate } from "../animations/infiniteScroll";
import { mapInput, skew } from "../animations/skew";

$(function() {
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

  let delta;

  // init the targets
  for (var i = 0; i < targets.length; i++) {
    targetList.push(initInfiniteScroll(targets[i], parents[i]));
  }

  // Wheel event
  $(window).on("wheel", e => {
    delta = e.originalEvent.deltaY;
    e.preventDefault();
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
    }
  });
});
