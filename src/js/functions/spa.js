export const requestArticle = (param) => {
    $.ajax({
        url: param,
        type: "GET,
        dataType: "json",
        success: () => {
            console.log('success');
        },
        error: () => {
            console.log('error');
        },
    });
}