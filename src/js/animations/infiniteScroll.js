$(function() {
  const targets = $(".ani-infiniteScroll_target");
  const parents = $(".ani-infiniteScroll_wrapper");
  const targetList = [];

  // scroll loop functions
  function setScrollPos(target, pos) {
    $(target).scrollLeft(pos);
  }

  function scrollUpdate(target) {
    const originWidth = target.originWidth;
    const scrollWidth = target.scrollWidth;
    const cloneWidth = target.cloneWidth;
    let scrollLeft = $(target.parent).scrollLeft();
    if (cloneWidth + scrollLeft >= scrollWidth) {
      setScrollPos(target.parent, 1);
    } else if (scrollLeft <= 0) {
      setScrollPos(target.parent, scrollWidth - cloneWidth);
    }
  }

  function initInfiniteScroll(target, parent) {
    const originWidth = $(target).width();
    $(target)
      .children()
      .clone()
      .appendTo(target);
    const scrollWidth = $(target).width();
    return {
      parent: $(parent),
      originWidth: originWidth,
      scrollWidth: scrollWidth,
      cloneWidth: scrollWidth - originWidth
    };
  }

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
