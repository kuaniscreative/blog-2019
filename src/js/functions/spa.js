export const requestArticle = param => {
  $.ajax({
    url: `pages/json/${param}.json`,
    type: "GET",
    dataType: "json",
    success: res => {
      window.history.pushState({}, param, window.location.origin + "/" + param);
    },
    error: err => {
      console.log(err);
    }
  });
};
