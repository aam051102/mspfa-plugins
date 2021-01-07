(() => {
    let showCommentary = false;

    // Get cookie data
    const cookieEnabled = document.cookie.split('; ').find(row => row.startsWith("commentary-enabled"));
    if(cookieEnabled) {
        let cookieValue = cookieEnabled.split("=")[1];

        showCommentary = parseInt(cookieValue);
    }

    // Find DOM elements
    const infoDOM = document.body.querySelector("#info");
    const rssBreakDOM = document.body.querySelector(".rss + br");

    const commentaryWrapperDOM = document.createElement("div");
    commentaryWrapperDOM.id = "commentary-wrapper";
    commentaryWrapperDOM.style.fontSize = "14px";
    commentaryWrapperDOM.style.fontWeight = "bold";
    commentaryWrapperDOM.style.display = "none";
    infoDOM.insertBefore(commentaryWrapperDOM, infoDOM.firstChild);

    // Update commentary box visibility and cookie
    const updateCommentaryBox = () => {
        document.cookie = `commentary-enabled=${showCommentary ? 1 : 0}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

        if(showCommentary) {
            commentaryWrapperDOM.style.display = "block";
        } else {
            commentaryWrapperDOM.style.display = "none";
        }
    };

    updateCommentaryBox();

    // Commentary checkbox wrapper
    const commentaryCheckboxWrapperDOM = document.createElement("div");
    commentaryCheckboxWrapperDOM.style.display = "flex";
    rssBreakDOM.parentNode.insertBefore(commentaryCheckboxWrapperDOM, rssBreakDOM);
    rssBreakDOM.remove();

    // Commentary checkbox
    const commentaryCheckboxDOM = document.createElement("input");
    commentaryCheckboxDOM.id = "commentary-checkbox";
    commentaryCheckboxDOM.type = "checkbox";
    commentaryCheckboxDOM.checked = showCommentary;
    commentaryCheckboxWrapperDOM.appendChild(commentaryCheckboxDOM);

    commentaryCheckboxDOM.addEventListener("change", function() {
        showCommentary = commentaryCheckboxDOM.checked;

        updateCommentaryBox();
    });

    // Commentary checkbox label
    const commentaryCheckboxLabelDOM = document.createElement("label");
    commentaryCheckboxLabelDOM.innerText = "Commentary";
    commentaryCheckboxLabelDOM.setAttribute("for", "commentary-checkbox");
    commentaryCheckboxWrapperDOM.appendChild(commentaryCheckboxLabelDOM);

    MSPFA.slide.push(() => {
        // Remove old commentary
        if(oldCommentaryDOM = document.querySelector("#commentary-posted")) {
            oldCommentaryDOM.remove();
        }

        // Get commentary
        const commentaryElement = document.querySelector("#content commentary");

        if(commentaryElement) {
            commentaryElement.id = "commentary-posted";
            commentaryWrapperDOM.appendChild(commentaryElement);

            if(showCommentary) {
                commentaryCheckboxDOM.checked = true;
            }
        }
    });
})();