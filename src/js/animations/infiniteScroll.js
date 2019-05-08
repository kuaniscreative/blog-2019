export function h_initInfiniteScroll(target, parent) {
  let originWidth = $(target).width();
  const clone = $(target)
    .children()
    .clone();
  $(clone).appendTo(target);
  let scrollWidth = $(target).width();
  if (originWidth < $(parent).width()) {
    originWidth = $(target).width();
    const clone = $(target)
    .children()
    .clone();
    $(clone).appendTo(target);
    scrollWidth = $(target).width();
  }
  return {
    self: $(target),
    parent: $(parent),
    originWidth: originWidth,
    scrollWidth: scrollWidth,
    cloneWidth: scrollWidth - originWidth
  };
}

export function h_setScrollPos(target, pos) {
  $(target).scrollLeft(pos);
}

export function h_scrollUpdate(target) {
  const originWidth = target.originWidth;
  const scrollWidth = target.scrollWidth;
  const cloneWidth = target.cloneWidth;
  let scrollLeft = $(target.parent).scrollLeft();
  if (cloneWidth + scrollLeft >= scrollWidth) {
    $(target.parent).scrollLeft(1);
  } else if (scrollLeft <= 0) {
    $(target.parent).scrollLeft(scrollWidth - cloneWidth);
  }
}

export function v_initInfiniteScroll(target, parent) {
  const originHeight = $(target).height();
  $(target)
    .children()
    .clone()
    .appendTo(target);
  const scrollHeight = $(target).height();
  return {
    parent: $(parent),
    originHeight: originHeight,
    scrollHeight: scrollHeight,
    cloneHeight: scrollHeight - originHeight
  };
}

export function v_setScrollPos(target, pos) {
  $(target).scrollTop(pos);
}

export function v_scrollUpdate(target) {
  const originHeight = target.originHeight;
  const scrollHeight = target.scrollHeight;
  const cloneHeight = target.cloneHeight;
  let scrollTop = $(target.parent).scrollTop();
  if (cloneHeight + scrollTop >= scrollHeight) {
    $(target.parent).scrollTop(1);
  } else if (scrollTop <= 0) {
    $(target.parent).scrollTop(scrollWidth - cloneWidth);
  }
}
