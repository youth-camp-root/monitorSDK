import tracker from "../utils/tracker";

export function injectBlankScreen() {
    const wrapperSelectors = ["body", "html", "#container", ".content"];
    let emptyPoints = 0;
    function isWrapper(element) {
        let selector = getSelector(element);
        if (wrapperSelectors.indexOf(selector) >= 0) {
            emptyPoints++;
        }
    }
    window.onload = function () {
        let xElements, yElements;
        debugger;
        for (let i = 1; i <= 9; i++) {
            xElements = document.elementsFromPoint(
                (window.innerWidth * i) / 10,
                window.innerHeight / 2
            );
            yElements = document.elementsFromPoint(
                window.innerWidth / 2,
                (window.innerHeight * i) / 10
            );
            isWrapper(xElements[0]);
            isWrapper(yElements[0]);
        }
        if (emptyPoints >= 0) {
            let centerElements = document.elementsFromPoint(
                window.innerWidth / 2,
                window.innerHeight / 2
            );
            tracker.send({
                categroy: 'BlankScreen',
                originURL: window.location.href,
                timestamp: Date.now(),
                errorType: 'blankscreenError',
                emptyPoints: "" + emptyPoints,
                screen: window.screen.width + "x" + window.screen.height,
                viewPoint: window.innerWidth + "x" + window.innerHeight,
                selector: '',
            }, 'error');
        }
    }
}

function getSelector(element) {
    var selector;
    if (element.id) {
        selector = `#${element.id}`;
    } else if (element.className && typeof element.className === "string") {
        selector =
            "." +
            element.className
                .split(" ")
                .filter(function (item) {
                    return !!item;
                })
                .join(".");
    } else {
        selector = element.nodeName.toLowerCase();
    }
    return selector;
}