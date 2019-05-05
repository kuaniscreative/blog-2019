import { h_initInfiniteScroll as initInfiniteScroll } from '../animations/infiniteScroll';
import { h_scrollUpdate as scrollUpdate } from '../animations/infiniteScroll';

$(function() {
    const targets = $(".ani-infiniteScroll_target");
    const parents = $(".ani-infiniteScroll_wrapper");
    const targetList = [];
    
    // init the targets
    for (var i = 0; i < targets.length; i++) {
      targetList.push(initInfiniteScroll(targets[i], parents[i]));
    }
  
    // Wheel event
    $(window).on("wheel", e => {
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