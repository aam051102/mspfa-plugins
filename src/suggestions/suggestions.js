(() => {
    // Gather rules
    let loop = null;
    const rules = [];
    const ruleTest = /@mad-mspa suggestions(?: (\d+))(?:;|\n|$)/g;
    let ruleMatch;
    
    while((ruleMatch = ruleTest.exec(MSPFA.story.y)) !== null) {
        rules.push([ruleMatch[1]]);
    }

    // Page slide
    const slide = () => {
        const contentSpanDOM = document.querySelector("#content > span");

        loop = null;

        // Add new suggestion boxes
        for(let i = 0; i < rules.length; i++) {
            if(rules[i][0] == MSPFA.p || (MSPFA.story.p.length == MSPFA.p && rules[i][0] >= MSPFA.story.p.length)) {
                const suggestionBoxElement = document.createElement("form");
                suggestionBoxElement.className = "mad-suggestion-box";

                const suggestionTextElement = document.createElement("span");
                suggestionTextElement.innerText = "Feel free to make suggestions:";

                const suggestionPopupElement = document.createElement("div");
                suggestionPopupElement.className = "mad-suggestion-popup";
                suggestionPopupElement.innerHTML = "Please&nbsp;<a href=\"https://mspfa.com/login/\">log in</a>&nbsp;to make a suggestion.";

                const suggestionInputElement = document.createElement("textarea");
                suggestionInputElement.className = "mad-suggestion-input";
                suggestionInputElement.rows = "4";

                const suggestionButtonElement = document.createElement("input");
                suggestionButtonElement.type = "button";
                suggestionButtonElement.value = "Submit";

                suggestionButtonElement.addEventListener("click", (e) => {
                    e.preventDefault();

                    MSPFA.request(1, {
                        do: "comment",
                        s: MSPFA.story.i,
                        p: MSPFA.p,
                        b: `Suggestion: ${suggestionInputElement.value}`
                    });
                });

                suggestionBoxElement.appendChild(suggestionTextElement);
                suggestionBoxElement.appendChild(suggestionInputElement);
                suggestionBoxElement.appendChild(suggestionButtonElement);
                suggestionBoxElement.appendChild(suggestionPopupElement);
                contentSpanDOM.appendChild(suggestionBoxElement);


                if(!loop) {
                    loop = setTimeout(update, 1000);
                }
            }
        }
    }

    // Update
    const update = () => {
        if(MSPFA.me && MSPFA.me.t != 0) {
            document.querySelectorAll(".mad-suggestion-popup").forEach((element) => {
                element.style.display = "none";
            });

            loop = null;
        } else {
            setTimeout(update, 1000);
        }
    }

    MSPFA.slide.push(slide);
})();