const question = document.querySelector(".question");
const progress = document.querySelector(".progress");
const countryElements = document.querySelectorAll("#AO, #BI, #BJ, #BF, #BW, #CF, #CI, #CM, #CD, #CG, #DJ, #DZ, #EG, #ER, #ET, #GA, #GH, #GN, #GM, #GW, #GQ, #KE, #LR, #LY, #LS, #MA, #MG, #ML, #MZ, #MR, #MW, #NA, #NE, #NG, #RW, #EH, #SD, #SS, #SN, #SL, #SZ, #TD, #TG, #TN, #TZ, #UG, #ZA, #ZM, #ZW, #SO");

let countries = [
"Angola",
"Burundi",
"Benin",
"Burkina Faso",
"Botswana",
"Central African Republic",
"Côte d'Ivoire",
"Cameroon",
"Democratic Republic of the Congo",
"Congo",
"Djibouti",
"Algeria",
"Egypt",
"Eritrea",
"Ethiopia",
"Gabon",
"Ghana",
"Guinea",
"Gambia",
"Guinea-Bissau",
"Equatorial Guinea",
"Kenya",
"Liberia",
"Libya",
"Lesotho",
"Morocco",
"Madagascar",
"Mali",
"Mozambique",
"Mauritania",
"Malawi",
"Namibia",
"Niger",
"Nigeria",
"Rwanda",
"Western Sahara",
"Sudan",
"South Sudan",
"Senegal",
"Sierra Leone",
"Swaziland",
"Chad",
"Togo",
"Tunisia",
"Tanzania",
"Uganda",
"South Africa",
"Zambia",
"Zimbabwe",
"Somalia"
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
        const clickedCountry = element.getAttribute("data-name");
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