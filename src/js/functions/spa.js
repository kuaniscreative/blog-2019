export const requestArticle = param => {
  $.ajax({
    url: `pages/json/${param}.json`,
    type: "GET",
    dataType: "json",
    success: res => {
      //   window.history.pushState({}, param, window.location.origin + "/" + param);
      window.location.hash = param;
      $("body").html(res.t);
    },
    error: err => {
      console.log(err);
    }
  });
};
