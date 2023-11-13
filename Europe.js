const question = document.querySelector(".question");
const progress = document.querySelector(".progress");
const countryElements = document.querySelectorAll("#AL, #AT, #BE, #BG, #BA, #BY, #CH, #CZ, #DE, #DK, #EE, #FI, #GB, #GR, #HR, #HU, #IE, #IS, #IT, #LT, #LU, #LV, #MD, #MK, #ME, #NL, #NO, #PL, #PT, #RO, #RS, #SK, #SI, #SE, #UA, #FR, #ES, #XK, #TR, #GE, #AM, #LI, #CY");

let countries = [
"Albania",
"Armenia",
"Austria",
"Belgium",
"Bulgaria",
"Bosnia and Herzegovina",
"Belarus",
"Switzerland",
"Czech Republic",
"Cyprus",
"Germany",
"Denmark",
"Estonia",
"Finland",
"Georgia",
"United Kingdom",
"Greece",
"Croatia",
"Hungary",
"Ireland",
"Iceland",
"Italy",
"Kosovo",
"Liechtenstein",
"Lithuania",
"Luxembourg",
"Latvia",
"Moldova",
"Macedonia",
"Montenegro",
"Netherlands",
"Norway",
"Poland",
"Portugal",
"Romania",
"Serbia",
"Slovakia",
"Slovenia",
"Sweden",
"Turkey",
"Ukraine",
"France",
"Spain"
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