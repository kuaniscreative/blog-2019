// First clone the content of target

$(function() {
  const targets = $(".ani-infiniteScroll_target");
  const parents = $(".ani-infiniteScroll_wrapper");
  const targetList = [];

  // init the targets
  for (let item of targets) {
    targetList.push(initInfiniteScroll(item));
  }
  // Wheel event
  $(window).on("wheel", e => {
    e.preventDefault();
    // let pos = $(parents)
    //   .eq(0)
    //   .scrollLeft();
    // pos += e.originalEvent.deltaY;
    // $(parents)
    //   .eq(0)
    //   .scrollLeft(pos);
  });

  function getScrollLeft(target) {
    $(target).scrollLeft();
  }

  function scrollUpdate(target) {
    const scrollLeft = getScrollLeft();
    const cloneWidth =
      $(".ani-infiniteScroll_target")
        .eq(0)
        .width() - originWidth;
    let scrollWidth = $(target).scrollWidth;
  }

  function scrollRender(target) {
    const cloneSize = $(target).width() - originWidth;
    if (cloneSize + scrollPos > scrollSize) {
      setScrollTo(1);
    } else if (scrollPos <= 0) {
      setScrollTo(scrollSize - cloneSize);
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
});
