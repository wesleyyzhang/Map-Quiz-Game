const question = document.querySelector(".question");
const progress = document.querySelector(".progress");
const countryElements = document.querySelectorAll("#AB, #AK, #AL, #AR, #AZ, #BC, #CA, #CO, #CT, #DE, #FL, #GA, #HI, #IA, #ID, #IL, #IN, #KS, #KY, #LA, #MA, #MB, #MD, #ME, #MI, #MN, #MO, #MS, #MT, #Mexico, #NB, #NC, #ND, #NE, #NH, #NJ, #NL, #NM, #NS, #NT, #NU, #NV, #NY, #OH, #OK, #ON, #OR, #PA, #PE, #PR, #QC, #RI, #SC, #SD, #SK, #TN, #TX, #UT, #VA, #VI, #VT, #WA, #WI, #WV, #WY, #YT");

let countries = [
"Alberta",
"Alaska",
"Alabama",
"Arkansas",
"Arizona",
"British Columbia",
"California",
"Colorado",
"Connecticut",
"Delaware",
"Florida",
"Georgia",
"Hawaii",
"Iowa",
"Idaho",
"Illinois",
"Indiana",
"Kansas",
"Kentucky",
"Louisiana",
"Massachusetts",
"Manitoba",
"Maryland",
"Maine",
"Michigan",
"Minnesota",
"Missouri",
"Mississippi",
"Montana",
"Mexico",
"New Brunswick",
"North Carolina",
"North Dakota",
"Nebraska",
"Newfoundland and Labrador",
"New Hampshire",
"New Jersey",
"New Mexico",
"Nova Scotia",
"Northwest Territories",
"Nunavut",
"Nevada",
"New York",
"Ohio",
"Oklahoma",
"Ontario",
"Oregon",
"Pennsylvania",
"Prince Edward Island",
"Quebec",
"Rhode Island",
"South Carolina",
"South Dakota",
"Saskatchewan",
"Tennessee",
"Texas",
"Utah",
"Virginia",
"Vermont",
"Washington",
"Wisconsin",
"West Virginia",
"Wyoming",
"Yukon"
];

let currentCountry;
let availableCountries;
let counter = 0;

function startGame() {
    availableCountries = [...countries];
    startTimer();
    getNewQuestion();
}

function getNewQuestion() {
    const countryIndex = Math.floor(Math.random() * availableCountries.length);
    currentCountry = availableCountries[countryIndex];
    question.textContent = currentCountry;
    availableCountries.splice(countryIndex, 1);
}

countryElements.forEach(element => {
    element.addEventListener("click", function() {
        const clickedCountry = element.getAttribute("name");
        console.log(clickedCountry);
        console.log(currentCountry);
        if (clickedCountry === currentCountry) {
            element.classList.add("selected");
            element.style.fill = "pink";
            counter += 1;
            progress.textContent = counter + "/" + countries.length;
            getNewQuestion();
        } else if (clickedCountry !== currentCountry) {
            addTimePenalty();
        }
        if (counter === countries.length) {
            stopTimer();
            question.textContent = "Complete!";
        }
    });
});

let timer;
let minutes = 0;
let seconds = 0;

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function addTimePenalty() {
    seconds += 5;
}

function updateTimer() {
    seconds++;

    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    const formattedTime = formatTime(minutes, seconds);
    document.querySelector('.timer').textContent = formattedTime;
}

function stopTimer() {
    clearInterval(timer);
}

function formatTime(minutes, seconds) {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);

function restartGame() {
    availableCountries = [...countries];
    counter = 0;
    progress.textContent = counter + '/' + countries.length;

    minutes = 0;
    seconds = 0;
    document.querySelector('.timer').textContent = formatTime(minutes, seconds);

    countryElements.forEach(element => {
        element.style.fill = ""; 
        element.classList.remove("selected");
    });

    stopTimer();
    startGame();
}

startGame();
