// let main = document.querySelector("main");
let boxes = document.querySelectorAll(".box");
let imgPoper = document.getElementById("poper");
let drawBox = document.getElementById("draw");
let msg = document.querySelector(".msg");
let reload = document.querySelector(".again i");
let playBtn = document.getElementById("play");
let turnBox = document.getElementById("turnBox");
let turnXO = document.querySelector(".XO");
let exitRestartBox = document.querySelector(".exre");
let exit = document.querySelector(".exit");
let restart = document.querySelector(".restart");
let confirmExit = document.getElementById("confirmExit");
let sure = document.querySelector(".sure");
let yes = document.querySelector(".yes");
let no = document.querySelector(".no");
let who;

let tap = new Audio("./tunes/tap.mp3");
let again = new Audio("./tunes/again.mp3");
let draw = new Audio("./tunes/lose.wav");
let success = new Audio("./tunes/success.mp3");
let clean = new Audio("./tunes/restart.mp3");


// COUNTER FOR TRACKING TURNS ON EACH BOX--->

let counter = 0;

// IF CLICKED ON PLAY , TRUE |||| IF NOT CLICKED ON PLAY , FALSE WILL BE STORED IN PLAY --->

let play = false;

// GENERATING X || O RANDOMLY --- >

let xy = ["X", "O"];

// VARIABLE FOR STORING "X" || "O"  --->

let text = `${xy[Math.round(Math.random())]}`;

// DISPLAYING <i> ICON OF X || O ACCORDING TO "text" VARIABLE'S VALUE --->

if (text == "X") {
    text = "O";
    turnXO.innerHTML = "<i class='fa-regular fa-circle fa-2xl'></i>";
} else if (text == "O") {
    text = "X";
    turnXO.innerHTML = "<i class='fa-solid fa-xmark fa-2xl'></i>";

}

// GAME LOGIC PATTERN / CRITERIA --->

let possibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


// EVENT LISTENER ON PLAY BUTTON --->

playBtn.addEventListener("click", () => {
    play = true;
    if (play) {
        boxes.forEach((box) => {
            box.style.pointerEvents = "all";
        });
    }
    playBtn.style.display = "none";
    turnBox.style.display = "flex";

});

// EVENT LISTENER ON BOXES --- >

boxes.forEach(function (e) {
    e.addEventListener("click", (box) => {
        if (box.target.innerText == "") {
            box.target.innerText = text;
            counter++;
            tap.play();
            changeTurn();
            checkWin();
            checkDraw();

        }

    });

});

//  X/O CHANGING | TURN CHANGE -->

function changeTurn() {
    if (text == "X") {
        text = "O";
        turnXO.innerHTML = "<i class='fa-regular fa-circle fa-2xl'></i>";
    } else if (text == "O") {
        text = "X";
        turnXO.innerHTML = "<i class='fa-solid fa-xmark fa-2xl'></i>";

    }
}


// Win check -->

function checkWin() {
    possibilities.forEach((arr) => {
        if ((boxes[arr[0]].innerText !== "") && (boxes[arr[0]].innerText === boxes[arr[1]].innerText) && (boxes[arr[2]].innerText === boxes[arr[1]].innerText)) {
            msg.innerText = `${boxes[arr[0]].innerText} WINS!`;
            drawBox.style.transform = "translateX(-0%)";
            imgPoper.style.display = "initial";
            turnBox.style.display = "none";
            success.play();
            play = false;
        }
    });
}


// DRAW check -->

function checkDraw() {

    if (counter === 9 && play) {
        turnBox.style.display = "none";
        msg.innerText = `Match Draw!`;
        drawBox.style.transform = "translateX(-0%)";
        draw.play();
        boxes.forEach((e) => {
            e.style.pointerEvents = "none";
        });

        play = false;
    }

}

// RELOAD / ROTATE SYMBOL --->
 
reload.addEventListener("click", () => {
    drawBox.style.transform = "translateX(-100%)";
    imgPoper.style.display = "none";
    again.play();
    playBtn.style.display = "initial";
    turnBox.style.display = "none";
    reset();

});

// RESET function in RELOAD -->

function reset() {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "none";
        
    });
    
    counter = 0;
    play = false;

    text = `${xy[Math.round(Math.random())]}`;

    if (text == "X") {
        turnXO.innerHTML = "<i class='fa-solid fa-xmark fa-2xl'></i>";

    } else if (text == "O") {

        turnXO.innerHTML = "<i class='fa-regular fa-circle fa-2xl'></i>";
    }
}


// CANCEL / EXIT BUTTON -->

exit.addEventListener("click", () => {
    confirmExit.style.display = "flex";

    if (text === "X") {
        who = "O";
        sure.innerText = `${who} will win? Sure?`;
    } else {
        who = "X";
        sure.innerText = `${who} will win? Sure?`;

    }

    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
    
    exit.style.pointerEvents = "none";
    restart.style.pointerEvents = "none";
    yesNo();




});

// FUNCTION on CANCEL /EXIT -->

function yesNo() {

    yes.addEventListener("click", () => {

        msg.innerText = `${who} WINS!`;
        drawBox.style.transform = "translateX(-0%)";
        imgPoper.style.display = "initial";
        turnBox.style.display = "none";
        success.play();
        play = false;

        confirmExit.style.display = "none";

        exit.style.pointerEvents = "all";
        restart.style.pointerEvents = "all";




    });


// ON pressing "NO" --->


    no.addEventListener("click", () => {
        confirmExit.style.display = "none";

        boxes.forEach((box) => {
            box.style.pointerEvents = "all";
        });

        exit.style.pointerEvents = "all";
        restart.style.pointerEvents = "all";
        
    });


}


// GAME RESTART OR FRESH PLAY -->

restart.addEventListener("click", ()=>{

    
    
    boxes.forEach((box) => {
        box.innerText = "";  
    });
    
    counter = 0;
    play = true;

    text = `${xy[Math.round(Math.random())]}`;
    // console.log(text);

    if (text == "X") {
        turnXO.innerHTML = "<i class='fa-solid fa-xmark fa-2xl'></i>";

    } else if (text == "O") {

        turnXO.innerHTML = "<i class='fa-regular fa-circle fa-2xl'></i>";
    }
    
    clean.play();
    
});


//  Get a reference to the "main" container

const mainContainer = document.querySelector('main');

// Function to update container dimensions

function updateContainerSize() {

    // Get the viewport width and height
    const inWidth = window.innerWidth;
    const inHeight = window.innerHeight;


    // Set minimum and maximum dimensions
    let minWidth; // Minimum width in pixels
    let minHeight; // Minimum height in pixels


    let maxWidthPercentage = 30; // Maximum width as a percentage of viewport width
    let maxHeightPercentage = 50; // Maximum height as a percentage of viewport height

    if (inWidth >= 360) {
        minWidth = 300;
        minHeight = 300;

        maxWidthPercentage = 30;
        maxHeightPercentage = 50;

    } else {
        minWidth = 250;
        minHeight = 250;
        maxWidthPercentage = 30;
        maxHeightPercentage = 30;

    }

    // Calculate the new dimensions
    let newWidth = inWidth * (maxWidthPercentage / 100);
    let newHeight = inHeight * (maxHeightPercentage / 100);

    // Ensure the dimensions are within the specified limits
    newWidth = Math.max(minWidth, newWidth);
    newHeight = Math.max(minHeight, newHeight);

    // Update the container's width and height
    mainContainer.style.width = `${newWidth}px`;
    mainContainer.style.height = `${newHeight}px`;
}

// Initial call to set the container's size
updateContainerSize();

// Listen for window resize events to update container size
window.addEventListener('resize', updateContainerSize);


