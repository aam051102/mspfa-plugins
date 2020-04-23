(() => {
    // Gather rules
    let loop = null;
    const rules = [];
    const ruleTest = /@mad-mspa fireflies(?: (\d+))(?: (\d+))(?: (\d+))(?:;|\n|$)/g;    
    let ruleMatch;
    
    while((ruleMatch = ruleTest.exec(MSPFA.story.y)) !== null) {
        rules.push([ruleMatch[1], ruleMatch[2], ruleMatch[3]])
    }
    
    // Constants
    const w = 140;
    const h = 140;
    const fmax = 24;
    const radius = 60;
    const fireflyWidth = 60;
    const fireflyHeight = 60;
    const fireflyFrameMax = 12;
    const bounceFactor = 1;
    const xx = w - fireflyWidth;
    const yy = h - fireflyHeight;
    const fpsrate = 15;
    
    // Variables
    let boxnum = 0;
    let cobj = [];
    let firefly = {};
    
    // Right firefly image variables
    const fireflyImageRightSrc = "https://www.homestuck.com/assets/firefly_sprite_opt-24a34a2f520a1f446eaad184671345bd18c84bb828e1a3a5b35f1b3073afb7e5.png";
    let fireflyImageRightLoaded = false;
    let fireflyImageRight;
    
    // Left firefly image variables
    const fireflyImageLeftSrc = "https://www.homestuck.com/assets/firefly_sprite_left_opt-2c7f3ba9044828d17ea0175d003b04bc2f04b3da0d3932022c4fd6735ca56d3b.png";
    let fireflyImageLeftLoaded = false;
    let fireflyImageLeft;

    // Page slide
    const slide = () => {
        const params = new URLSearchParams(location.search);
        const parameterPage = params.get("p");
        if(document.querySelector("#mad-mspa-fireflies") !== null) {
            document.body.removeChild(document.querySelector("#mad-mspa-fireflies"));
        }

        if(loop !== null) {
            clearInterval(loop);
        }


        let fireflyAmount = 0;
        for (let i = 0; i < rules.length; i++) {
            if (parameterPage == rules[i][2]) {
                constructFirefly(rules[i], fireflyAmount);
                fireflyAmount++;
            }
        }

        init(fireflyAmount);
    }

    const constructFirefly = (rule, fireflyID) => {
        let mainElement;
        if(document.querySelector("#mad-mspa-fireflies") === null) {
            mainElement = document.createElement("div");
            mainElement.id = "mad-mspa-fireflies";
        } else {
            mainElement = document.querySelector("#mad-mspa-fireflies");
        }
        

        const fboxElement = document.createElement("canvas");
        fboxElement.className = "mad-mspa-fireflies-fbox";
        fboxElement.id = "fbox_" + fireflyID;
        fboxElement.style.top = rule[0] + "%";
        fboxElement.style.left = rule[1] + "%";


        mainElement.appendChild(fboxElement);
        document.body.appendChild(mainElement);
    }

    // Creates a random number
    const randnum = (min, max, extra) => {
        return Math.floor(Math.random() * (max - min + 1)) + min + extra;
    }

    const update = () => {
        for (var e = 0; e < boxnum; e++) {
            cobj[e].clearRect(0, 0, w, h);
            
            // Change firefly frame
            cobj[e].save();

            if(firefly[e].frame > fireflyFrameMax) {
                firefly[e].frame = 0;
                firefly[e].delay = 1;
                firefly[e].delaytick = 0;
            }

            firefly[e].tx = firefly[e].frame * fireflyWidth;


            // Render firefly
            if(firefly[e].dir) {
                if(fireflyImageRightLoaded) cobj[e].drawImage(fireflyImageRight, firefly[e].tx, 0, fireflyWidth, fireflyHeight, firefly[e].x, firefly[e].y, fireflyWidth, fireflyHeight);
            } else {
                if(fireflyImageLeftLoaded) cobj[e].drawImage(fireflyImageLeft, firefly[e].tx, 0, fireflyWidth, fireflyHeight, firefly[e].x, firefly[e].y, fireflyWidth, fireflyHeight);
            }


            // Chamge firefly delay
            if(firefly[e].delay) {
                firefly[e].delaytick++;
    
                if(firefly[e].delaytick > fpsrate) {
                    firefly[e].delay = 0;
                    firefly[e].delaytick = 0;
                }
            } else {
                firefly[e].frame++;
            }

            cobj[e].restore();


            firefly[e].y += firefly[e].yvel;
            firefly[e].x += firefly[e].xvel;

            // Bouncing vertical
            if(firefly[e].y + radius > h) {
                firefly[e].y = h - radius;
                firefly[e].yvel = randnum(1, 2, 1);
                firefly[e].yvel *= -bounceFactor;
            }
            if(firefly[e].y - radius < -60) {
                firefly[e].yvel *= -bounceFactor;
                firefly[e].y += firefly[e].yvel;
                firefly[e].yvel = randnum(1, 2, 1);
            }

            // Bouncing horizontal
            if(firefly[e].x + radius > w) {
                firefly[e].dir = 0;
                firefly[e].x = w - radius;
                firefly[e].xvel = randnum(1, 2, 1);
                firefly[e].xvel *= -bounceFactor;
            }
            if(firefly[e].x - radius < -60) {
                firefly[e].dir = 1;
                firefly[e].xvel *= -bounceFactor;
                firefly[e].x += firefly[e].xvel;
                firefly[e].xvel = randnum(1, 2, 1);
            }
        }
    }

    const init = (fireflyAmount) => {
        boxnum = fireflyAmount;
        cobj = [];
        firefly = {};

        // Load right firefly image
        if(!fireflyImageRightLoaded) {
            fireflyImageRight = new Image();
            fireflyImageRight.src = fireflyImageRightSrc;
            fireflyImageRight.onload = function() {
                fireflyImageRightLoaded = true;
            };
        }

        // Load left firefly image
        if(!fireflyImageLeftLoaded) {
            fireflyImageLeft = new Image();
            fireflyImageLeft.src = fireflyImageLeftSrc;
            fireflyImageLeft.onload = function() {
                fireflyImageLeftLoaded = true;
            };
        }


        for (let i = 0; i < boxnum; i++) {
            const fboxDOMThis = document.getElementById("fbox_" + i);
            fboxDOMThis.width = w;
            fboxDOMThis.height = h;

            const fboxContextThis = fboxDOMThis.getContext("2d");
            cobj.push(fboxContextThis);

            firefly[i] = {
                dir: randnum(0, 1, 0),
                x: randnum(0, xx, 0),
                y: randnum(0, yy, 0),
                xvel: randnum(0, 3, 1),
                yvel: randnum(0, 3, 1),
                frame: randnum(0, fmax, 0),
                tick: randnum(0, fmax, 0),
                tx: 0,
                delay: 0,
                delaytick: 0
            };
        }

        loop = setInterval(update, 1000 / fpsrate);
    }

    MSPFA.slide.push(slide);
})();