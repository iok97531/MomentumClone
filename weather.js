const weather = document.querySelector(".js-weather");


const API_KEY = "be880bfcde15325a4eb134b2b3518e7e";
const COORDS_LS = "coords";

function getWeather(letitude, longitude)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${letitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    .then(function(response)
    {
        return response.json();
    }).then(function(json)
    {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}


function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position)
{
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude: latitude,
       longitude: longitude
   };
   saveCoords(coordsObj);
}

function handleGeoError()
{

}

function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if(loadedCoords === null)
    {
        askForCoords();
    }
    else
    {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();