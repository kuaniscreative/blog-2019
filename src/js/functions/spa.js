export const requestArticle = (param) => {
    $.ajax({
        url: `pages/json/${param}.json`,
        type: "GET",
        dataType: "json",
        success: (res) => {
            console.log(res);
        },
        error: (err) => {
            console.log(err);
        },
    });
}
