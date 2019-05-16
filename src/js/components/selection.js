import { h_initInfiniteScroll as initInfiniteScroll } from "../animations/infiniteScroll";
import { h_scrollUpdate as scrollUpdate } from "../animations/infiniteScroll";
import { mapInput, skew } from "../animations/skew";

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
  $('.nav_toIndex').one('click', () => {
    for (var i = 0; i < targets.length; i++) {
      targetList[i] = initInfiniteScroll(targets[i], parents[i])
    } 
  })

  // reCal if size change
  $(window).resize(() => {
    for (var i = 0; i < targets.length; i++) {
      targetList[i] = initInfiniteScroll(targets[i], parents[i])
    } 
  })


  // Wheel event
  $(window).on("wheel", e => {
    for (let [index, item] of $(targetList)
      .toArray()
      .entries()) {
      if (index % 2 === 0) {
        if ($("#indexSelection").css('display') !== 'none'){
          e.preventDefault();
        }
        let curPos = $(item.parent).scrollLeft();
        curPos -= e.originalEvent.deltaY;
        $(item.parent).scrollLeft(curPos);
        scrollUpdate(item);
      } else {
        if ($("#indexSelection").css('display') !== 'none'){
          e.preventDefault();
        }
        let curPos = $(item.parent).scrollLeft();
        curPos += e.originalEvent.deltaY;
        $(item.parent).scrollLeft(curPos);
        scrollUpdate(item);
      }
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
