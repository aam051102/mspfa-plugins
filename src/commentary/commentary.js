(() => {
    let showCommentary = false;

    // Find DOM elements
    const infoDOM = document.body.querySelector("#info");
    const rssBreakDOM = document.body.querySelector(".rss + br");

    const commentaryWrapperDOM = document.createElement("div");
    commentaryWrapperDOM.id = "commentary-wrapper";
    commentaryWrapperDOM.style.fontSize = "14px";
    commentaryWrapperDOM.style.fontWeight = "bold";
    commentaryWrapperDOM.style.display = "none";
    infoDOM.insertBefore(commentaryWrapperDOM, infoDOM.firstChild);

    // Commentary checkbox wrapper
    const commentaryCheckboxWrapperDOM = document.createElement("div");
    commentaryCheckboxWrapperDOM.style.display = "flex";
    rssBreakDOM.parentNode.insertBefore(commentaryCheckboxWrapperDOM, rssBreakDOM);
    rssBreakDOM.remove();

    // Commentary checkbox
    const commentaryCheckboxDOM = document.createElement("input");
    commentaryCheckboxDOM.id = "commentary-checkbox";
    commentaryCheckboxDOM.type = "checkbox";
    commentaryCheckboxWrapperDOM.appendChild(commentaryCheckboxDOM);

    commentaryCheckboxDOM.addEventListener("change", function() {
        showCommentary = commentaryCheckboxDOM.checked;

        if(showCommentary) {
            commentaryWrapperDOM.style.display = "block";
        } else {
            commentaryWrapperDOM.style.display = "none";
        }
    });

    // Commentary checkbox label
    const commentaryCheckboxLabelDOM = document.createElement("label");
    commentaryCheckboxLabelDOM.innerText = "Commentary";
    commentaryCheckboxLabelDOM.setAttribute("for", "commentary-checkbox");
    commentaryCheckboxWrapperDOM.appendChild(commentaryCheckboxLabelDOM);


    function slide() {
        // Remove old commentary
        if(oldCommentaryDOM = document.querySelector("#commentary-posted")) {
            oldCommentaryDOM.remove();
        }

        // Get commentary
        const commentaryElement = document.querySelector("#content commentary");
        console.log(commentaryElement);

        if(commentaryElement) {
            commentaryElement.id = "commentary-posted";
            commentaryWrapperDOM.appendChild(commentaryElement);

            if(showCommentary) {
                commentaryCheckboxDOM.checked = true;
            }
        }
    }

    MSPFA.slide.push(slide);
})();