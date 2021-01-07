MSPFA.slide.push(() => {
    const audio = [];
    let elements_DOM = document.querySelectorAll(".audiohover");

    elements_DOM.forEach((element, i) => {
        audio.push(new Audio(element.getAttribute("data-src")));

        element.addEventListener("mouseover", () => {
            audio[i].play();
        });
    });
});