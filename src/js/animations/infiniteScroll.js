// First clone the content of target

$(function() {
  const targets = $(".ani-infiniteScroll_target");
  console.log($(targets[0]).innerWidth())
  for (let item of targets) {
    $(item)
      .children()
      .clone()
      .appendTo(item);
  }
  $(window).on('wheel', () => {
      console.log('ddd');
  })
  $(window).on('touchmove', () => {
    $(window).trigger('wheel')
})
});