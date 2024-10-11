const apiKey = "4b89f55e35d1311d10ec5b0b5fa2b39b";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weathers ={
    Clear: "./images/main/clear.png",
    Clouds: "./images/main/clouds.png",
    Drizzle: "./images/main/drizzle.png",
    Humidity: "./images/main/humidity.png",
    Mist: "./images/main/mist.png",
    Rain: "./images/main/rain.png",
    Snow: "./images/main/snow.png",
    Wind: "./images/main/wind.png",
};

const form = document.forms.forma;
const town_input = form.elements.town;
const searchButton = document.querySelector(".input_btn")
const weatherIcon = document.querySelector(".weather_ico");


async function checkWeather(city) {

    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);
    if (data.cod === 200) {

        document.querySelector('.town').textContent = data.name;
        document.querySelector('.temp').textContent = Math.floor(data.main.temp) +"°C";
        document.querySelector('.hum').textContent = Math.floor(data.main.humidity) +"%";
        document.querySelector('.wind').textContent = Math.floor(data.wind.speed) +" km/h";

        const weat = data.weather[0].main;
        weatherIcon.src = weathers[weat];
    }
    else {
        document.querySelector('.town').textContent = `Город ${city} не найден`;
    }

}



// function handleSearch() {
//     checkWeather(searchBox.value);
// }

// searchButton.addEventListener("click", handleSearch);
//
// searchBox.addEventListener('keydown', function(evt) {
//     if (evt.key === "Enter") {
//         handleSearch();
//     }
// });


//TODO 1# переписать обработчик клика на sumbit (+)

function setSubmitButtonState(isFormValid) {
    if (isFormValid) {
        searchButton.removeAttribute('disabled');
        searchButton.classList.remove('input_btn_disabled');
    } else {
        searchButton.setAttribute('disabled', true);
        searchButton.classList.add('input_btn_disabled');
    }
}

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    checkWeather(town_input.value);
    form.reset();
    setSubmitButtonState(false);
});

form.addEventListener('input', function (evt) {
    const isValid = town_input.value.length > 0 ;
    setSubmitButtonState(isValid);
});


