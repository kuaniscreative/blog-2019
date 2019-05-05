export function mapInput(input) {
    const minIn = 0;
    const maxIn = 300;
    const minOut = 10;
    const maxOut = 300;
    return (input - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut;
}

export function skew(target, input) {

    $(target).css({
        'transform': `skewX(${input}deg)`
    });



    requestAnimationFrame(skew);
}