// Using only HTML, CSS and plain Javascript, create a Stopwatch application that meets *at least* the following criteria:

// • Supports a start button/feature, which begins the clock.

// • Supports a pause button/feature, which pauses the clock.

// • Supports a resume button/feature, which resumes a paused clock.

// • Supports a reset button/feature, which resets the time.

// • Supports being insert on a page multiple times, i.e. 3 or more separate clocks should be able to run independently at once.

// • Make sure it is responsive.

//variables to manage 
let clock = document.getElementById("clock");
let start = document.getElementById("start");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
let progressValue = document.querySelector('.progress__value');

// variables for radial progress bar
let RADIUS = 54;
let CIRCUMFERENCE = 2 * Math.PI * RADIUS;

//prevent clock from being sped up unintentionally 
let clockRunning = false;
let time = 0;

//variable to hold setInterval that runs timer
let intervalId;

const count = () => {
    time++; 
    let converted = timeConverter(time);
    // console.log(converted);
    clock.textContent = converted
}

//ES6 syntax to increment time based on user interaction 
const timeConverter = (t) => {

    let hours = Math.floor(t / 360);
    let minutes = Math.floor(t / 60);
    let seconds = t - (minutes * 60);

    let progress = t / 60;
    let dashoffset = CIRCUMFERENCE * (1 - progress);


    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes === 0) {
        minutes = "00";
    }
    if (hours === 0){
        hours = "00"
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }
    else if (hours < 10) {
        hours = "0" + hours;
    }
    
    return (progressValue.style.strokeDashoffset = dashoffset),
    hours + ":" + minutes + ":" + seconds;    


}


reset.onclick = () => {
    
    clockRunning = false;
    time = 0;
    clock.textContent = "00:00:00";
    
    // console.log('this is a test');
}

//this will start and resume the counter
start.onclick = () => {
    // start count and set clock to running
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;

    } 
}

//this will pause the counter
pause.onclick = () => {
    //stop the count and set the clock to stop running
    clearInterval(intervalId);
    clockRunning = false;
}


start.addEventListener('input', function(event) {
    progress(event.target.valueAsNumber);
});

progressValue.style.strokeDasharray = CIRCUMFERENCE;
progress(60);

