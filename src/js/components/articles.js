const clickArea = $(".articles_titleClickArea")[0];
const black = "#202020";
const titleGray = "#f2f2f2";
const cubicBezier = "cubic-bezier(.14,.88,.86,1.01)";


// trigger article animation when show
export function articleAnimationShow() {
  const title = $(".articles_title span")[0];
  const content = $(".articles_content")[0];

  resetToAnimationStart()

  $(title).addClass("ani-article_title");
  $(content).addClass("ani-article_content");

  addlistener_article();
}
articleAnimationShow();


// part of show animation

// We have to manully write the style after animation end for hover animation
// else the 'forwards' keyword in css animation will prevent js overiding the style

function resetToAnimationStart() {
  const title = $(".articles_title span")[0];
  const content = $(".articles_content")[0];

  $(title).css({
    color: titleGray
  });
  $(content).css({
    transform: "translate(0, 100%)",
    opacity: "0"
  });
}

function addlistener_article() {
  const title = $(".articles_title span")[0];
  const content = $(".articles_content")[0];

  $(".articles_title span")
    .eq(0)
    .on("animationend", e => {
      e.stopPropagation();
      const aniName = e.originalEvent.animationName;
      if (aniName === "titleShow--slide") {
        $(title).css({
          color: black,
          transform: "translate(0, 0)"
        });
      } else if (aniName === "titleShow--color") {
        $(title).css({
          color: titleGray
        });
        $(title).removeClass("ani-article_title");
      }
    });
  $(".articles_content")
    .eq(0)
    .on("animationend", e => {
      e.stopPropagation();
      const aniName = e.originalEvent.animationName;
      if (aniName === "contentFlyIn") {
        $(content).css({
          transform: "translate(0)",
          opacity: "1"
        });
        $(content).removeClass("ani-article_content");
      }
    });
}


// hover animation
const mouseInHandler = () => {
  const title = $(".articles_title span")[0];
  const content = $(".articles_content")[0];
  $(title).css({
    transition: `0.5s ${cubicBezier}`,
    color: black,
    "z-index": "1"
  });
  $(content).css({
    transition: `0.5s ${cubicBezier}`,
    transform: "translate(8rem, 0)",
    color: titleGray,
    "z-index": "0"
  });
};
const mouseOutHandler = () => {
  const title = $(".articles_title span")[0];
  const content = $(".articles_content")[0];
  $(title).css({
    color: "#f2f2f2",
    "z-index": "0"
  }).one('transitionend', () => {
    $(title).css('transition', 'none');
  });
  $(content).css({
    transform: "translate(0, 0)",
    color: black,
    "z-index": "1"
  }).one('transitionend', () => {
    $(content).css('transition', 'none');
  });
};

$(clickArea).hover(mouseInHandler, mouseOutHandler);