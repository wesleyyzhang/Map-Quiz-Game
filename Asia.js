const question = document.querySelector(".question");
const progress = document.querySelector(".progress");
const countryElements = document.querySelectorAll("#RU, #AE, #AF, #BD, #BH, #BN, #BT, #CN, #ID, #IL, #IN, #IQ, #IR, #JO, #JP, #KG, #KH, #KP, #KR, #KW, #KZ, #LA, #LB, #LK, #MM, #MN, #MY, #NP, #OM, #PG, #PH, #PK, #PS, #QA, #SA, #SG, #SY, #TH, #TJ, #TL, #TM, #TW, #UZ, #VN, #YE");

let countries = [
"Russia",
"United Arab Emirates",
"Afghanistan",
"Bangladesh",
"Bahrain",
"Brunei Darussalam",
"Bhutan",
"China (People's Republic of)",
"Indonesia",
"Israel",
"India",
"Iraq",
"Iran",
"Jordan",
"Japan",
"Kyrgyzstan",
"Cambodia",
"North Korea",
"South Korea",
"Kuwait",
"Kazakhstan",
"Lao People's Democratic Republic",
"Lebanon",
"Sri Lanka",
"Myanmar",
"Mongolia",
"Malaysia",
"Nepal",
"Oman",
"Papua New Guinea",
"Philippines",
"Pakistan",
"Palestine",
"Qatar",
"Saudi Arabia",
"Singapore",
"Syria",
"Thailand",
"Tajikistan",
"Timor-Leste",
"Turkmenistan",
"Taiwan (Republic of China)",
"Uzbekistan",
"Vietnam",
"Yemen"
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
        const clickedCountry = element.getAttribute("title");
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