// First clone the content of target

$(function() {
  const targets = $(".ani-infiniteScroll_target");
  const parent = $(".ani-infiniteScroll_wrapper");
  const testWidth = $(parent)
    .eq(0)
    .width();

  // Clone the contents
  for (let item of targets) {
    $(item)
      .children()
      .clone()
      .appendTo(item);
  }
  // Wheel event
  $(window).on("wheel", e => {
    e.preventDefault();
    let pos = $(parent)
      .eq(0)
      .scrollLeft();
    pos += e.originalEvent.deltaY;

    $(parent)
      .eq(0)
      .scrollLeft(pos);
  });
});
