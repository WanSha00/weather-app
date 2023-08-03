const weatherImg = document.querySelector(".weather-icon");
const giphyKey = "e2BgRs6V2YLPLITSPm3nUT4tG32xNVxQ";

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const tempButton = document.querySelector(".temp-btn");

let location = "";
let celcius = true;
const weatherKey = "c3e1a956247c453486d90846230108";

async function getData() {
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${location}`;
  const weatherResponse = await fetch(weatherUrl, { mode: "cors" });

  if (weatherResponse.status == "400") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    tempButton.style.display = "none";
  } else {
    tempButton.style.display = "block";
    document.querySelector(".error").style.display = "none";
    const weatherData = await weatherResponse.json();

    const condition = weatherData.current.condition.text;
    const giphyUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${condition}`;
    const response = await fetch(giphyUrl, { mode: "cors" });
    const gifData = await response.json();
    weatherImg.src = gifData.data.images.original.url;

    document.querySelector(".city").innerHTML =
      weatherData.location.name + ", " + weatherData.location.country;

    if (celcius) {
      document.querySelector(".temp").innerHTML =
        weatherData.current.temp_c + "°C";
      document.querySelector(".temp-btn").innerHTML = "Display in °F";
    } else {
      document.querySelector(".temp").innerHTML =
        weatherData.current.temp_f + "°F";
      document.querySelector(".temp-btn").innerHTML = "Display in °C";
    }

    document.querySelector(".condition").innerHTML = condition;
    document.querySelector(".humidity").innerHTML =
      weatherData.current.humidity + "%";
    document.querySelector(".windspeed").innerHTML =
      weatherData.current.wind_kph + " km/h";

    document.querySelector(".weather").style.display = "block";
  }
}

searchButton.addEventListener("click", () => {
  location = searchInput.value;
  getData();
});

tempButton.addEventListener("click", () => {
  celcius = !celcius;
  location = searchInput.value;
  getData();
});
