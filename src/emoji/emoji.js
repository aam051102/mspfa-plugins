(() => {
    // Gather rules
    const ruleTest = /@emoji suggestions(?: (\d+))(?:;|\n|$)/g;
    let ruleMatch;
    
    const style = document.createElement("style");
    while((ruleMatch = ruleTest.exec(MSPFA.story.y)) !== null) {
        style.textContent += `emoji-${ruleMatch[1]}::before {
            background-image: url(${ruleMatch[2]});
        }`;
        console.log(ruleMatch)
    }
    document.head.appendChild(style);
})();