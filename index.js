
/*----------------------------------- Element-Selection -------------------------------------------------------------------------*/ 

const quoteDisplayElement  = document.getElementById("quote-display");
const quoteInputElement  = document.getElementById("quote-input");
const timerElement = document.getElementById("timer");
const resetButton = document.getElementById("reset-btn");
const resultMsg = document.getElementById("result-msg");

const demoQuote = "Some of the rules of etiquette may seem outdated stuffy and unnecessary.";


/*--------------------- Rendering the display-quote by pushing each character inside span element -------------------------------*/ 

function renderQuote() {
    const demoQuoteArr = demoQuote.split("");
    quoteDisplayElement.innerHTML = "";

    demoQuoteArr.forEach((char) => {
        const newSpan = document.createElement("span");
        newSpan.innerText = char;
        quoteDisplayElement.append(newSpan);
    });
}

renderQuote();


/*------- Comparing each input character with display-quote and accordingly changing the style of display characters ---------------*/ 


let isCorrect = false;          // To know typing is completed correctly or not, inorder to stop the timer and display results

quoteInputElement.addEventListener("input",() => {
    const quoteArr = quoteDisplayElement.querySelectorAll("span");
    const inputArr = quoteInputElement.value.split("");

    quoteArr.forEach((charSpan,index) => {
        const inputChar = inputArr[index];

        if (inputChar == null){
            charSpan.classList.remove("correct");
            charSpan.classList.remove("incorrect");
            isCorrect = false;
        }
        else if (inputChar === charSpan.innerText){
            charSpan.classList.remove("incorrect");
            charSpan.classList.add("correct");
            isCorrect = true;
        }
        else if (inputChar !== charSpan.innerText){
            charSpan.classList.remove("correct");
            charSpan.classList.add("incorrect");
            isCorrect = false;
        }
    });

    if (isCorrect){                                           // After completing the typing correctly
        clearInterval(timeInterval);                          // clearInterval stops the setInteval
        let speed = calculateSpeed();                           // Typing speed calculating function 
        resultMsg.innerText = `Typing Speed: ${speed} WPM`;     // Displaying the result of typing speed
    }
})


/*-------------------------- Function to run the timer by using setInterval function -----------------------------------------------*/ 

let timeInterval;
let startTime;
let timeElapsed;

function timer() {
    // Start the timer with 0
    timerElement.innerText = 0;
    startTime = new Date();                             // Function to get current-time in miliseconds
    // setTimeout - Runs only once.
    // setInterval - Runs after every given seconds.
    timeInterval = setInterval(() => {
            // timeElapsed = currentTime - startTime.
            timeElapsed = Math.floor((new Date() - startTime)/1000);
            timerElement.innerText = timeElapsed;  
    },1000);
}


/*---------------- An event to start the timer() -------------------------*/ 


quoteInputElement.addEventListener("click",() => {
    timer();
})


/*------------------- Functions to get-time and to calculate typing speed ---------------------------------*/ 

function getTime() {
    return Math.floor((new Date() - startTime)/1000);
}

function calculateSpeed() {
    const quoteLength = demoQuote.length;
    return Math.floor(quoteLength / (getTime()/60));
}


/*----------------------------------------- Reset Button functioning ---------------------------------------*/ 

resetButton.addEventListener("click",() => {
    clearInterval(timeInterval);
    quoteInputElement.value = "";
    renderQuote();
    timerElement.innerText = 0;
    resultMsg.style.display = "none";
})