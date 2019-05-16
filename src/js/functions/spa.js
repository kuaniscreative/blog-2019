import { articleAnimationShow } from '../components/articles';

export const requestArticle = param => {
  $.ajax({
    url: `pages/json/${param}.json`,
    type: "GET",
    dataType: "json",
    success: res => {
      window.history.pushState({}, param, window.location.origin + "/" + param + '.html');

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
      articleAnimationShow()
    },
    error: err => {
      console.log(err);
    }
  });
};
