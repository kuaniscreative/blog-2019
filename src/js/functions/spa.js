export const requestArticle = param => {
  $.ajax({
    url: `pages/json/${param}.json`,
    type: "GET",
    dataType: "json",
    success: res => {
      // window.history.pushState({}, param, window.location.origin + "/" + param);

      //animation
      $(".nav").css({
        display: "none"
      });
      $("#indexSelection").css({
        display: "none"
      });
      $(".articles_title span").html(res.title);
      $(".articles_title--mobile span").html(res.title);
      $(".articles_content--scroll").html(res.content);
      console.log($(".articles_title").css("opacity"));
      $(".articles_title span").addClass('ani-trigger');
      // $(".articles_title span")
      //   .hide()
      //   .show();

      // $(".articles_content")
      //   .hide()
      //   .show();
    },
    error: err => {
      console.log(err);
    }
  });
};
