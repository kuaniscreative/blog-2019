const clickArea = $(".articles_titleClickArea")[0];
const title = $(".articles_title span")[0];
const content = $(".articles_content")[0];
const black = "#202020";
const titleGray = "#f2f2f2";
const cubicBezier = 'cubic-bezier(.14,.88,.86,1.01)'

// hover animation
const mouseInHandler = () => {
  $(title).css({
    transition: `0.5s ${cubicBezier}`,
    color: black,
    "z-index": "1"
  });
  $(content).css({
    transition: `0.5s ${cubicBezier}`,
    transform: 'translate(8rem, 0)',
    color: titleGray,
    "z-index": "0"
  });
};
const mouseOutHandler = () => {
  $(title).css({
    color: "#f2f2f2",
    "z-index": "0"
  });
  $(content).css({
    transform: 'translate(0, 0)',
    color: black,
    "z-index": "1"
  });
};

$(clickArea).hover(mouseInHandler, mouseOutHandler);

// part of show animation

// We have to manully write the style after animation end for hover animation
// else the 'forwards' keyword in css animation will prevent js overiding the style

$(title).on("animationend", e => {
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
  }
});

$(content).on("animationend", e => {
  e.stopPropagation();
  const aniName = e.originalEvent.animationName;
  if (aniName === "contentFlyIn") {
    $(content).css({
      transform: "translate(0)",
      opacity: "1"
    });
  }
});
