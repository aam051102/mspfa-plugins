const observeDOM = (function () {
    const MutationObserver =
        window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
            // define a new observer
            const mutationObserver = new MutationObserver(callback);

            // have the observer observe for changes in children
            mutationObserver.observe(obj, { childList: true, subtree: true });
            return mutationObserver;
        }

        // browser support fallback
        else if (window.addEventListener) {
            obj.addEventListener("DOMNodeInserted", callback, false);
            obj.addEventListener("DOMNodeRemoved", callback, false);
        }
    };
})();

const CSS_STR = MSPFA.story.y;
const pageRangeRegex = /ruffle\.p(\d+(?:-\d+)?)/g;

let pageRangeMatch;
let pageRanges = {};

while ((pageRangeMatch = pageRangeRegex.exec(CSS_STR))) {
    let shouldNotParse = false;
    let pos = pageRangeMatch.index + pageRangeMatch[0].length;
    let openBrackets = [];
    let parsedStyles = "";

    while (pos < CSS_STR.length) {
        const c = CSS_STR[pos];

        if (c === "{") {
            openBrackets.push(pos);
        } else if (c === "}") {
            if (openBrackets.length === 1) {
                const start = openBrackets[0];
                parsedStyles = CSS_STR.substr(start + 1, pos - 1 - (start + 1));
                openBrackets.pop();
                break;
            }

            openBrackets.pop();
        } else if (openBrackets.length == 0 && c !== " " && c !== "\n") {
            shouldNotParse = true;
            break;
        }

        pos++;
    }

    if (shouldNotParse) continue;

    if (!pageRanges["p" + pageRangeMatch[1]]) {
        let pageRange = pageRangeMatch[1].split("-");
        pageRange[0] = parseInt(pageRange[0]);

        if (pageRangeMatch[1].includes("-")) {
            pageRange[1] = parseInt(pageRange[1]) || MSPFA.story.p.length;
        }

        pageRanges["p" + pageRangeMatch[1]] = { range: pageRange, styles: [] };
    }

    if (openBrackets.length != 0) throw new Error("Invalid CSS.");

    pageRanges["p" + pageRangeMatch[1]].styles.push(parsedStyles);
}

observeDOM(document.querySelector("#content"), (m) => {
    m.forEach((record) => {
        record.addedNodes.forEach((el) => {
            if (el.tagName.toLowerCase() === "ruffle-object") {
                let cssToInject = "";

                for (const i in pageRanges) {
                    if (
                        (pageRanges[i].range[1] &&
                            MSPFA.p >= pageRanges[i].range[0] &&
                            MSPFA.p <= pageRanges[i].range[1]) ||
                        MSPFA.p == pageRanges[i].range[0]
                    ) {
                        cssToInject += pageRanges[i].styles.join("\n") + "\n";
                    }
                }

                const dStyle = document.createElement("style");
                dStyle.id = "mad-injected-style";
                dStyle.innerText = cssToInject;
                el.shadowRoot.appendChild(dStyle);
            }
        });
    });
});
