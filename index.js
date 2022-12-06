let searchIcon = document.getElementById('search')
searchIcon.addEventListener('click', () => {
    console.log('clicked');
    console.log(searchIcon.parentNode.querySelector('#location'));
    searchIcon.parentNode.querySelector('#location').classList.toggle('expand')
})

let container = document.getElementById('container');
let weatherIcon = container.querySelector('#weather-icon');
let weatherDescription = container.querySelector('#weather-description');
let tempperature = container.querySelector('#temp');
let windSpeed = container.querySelector('#wind-speed');
let humidity_ = container.querySelector('#humidity');
let cloudiness = container.querySelector('#cloudiness');
let location_nfo = container.querySelector('#location-info');
// const API_KEY = "85b9a8d4e5c4452cbeb11610222711";
// let search_location = document.getElementById('location')
// const search_url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${search_location}&aqi=yes`


// window.addEventListener('load', () => {})
// fetch('http://api.weatherapi.com/v1/current.json?key=85b9a8d4e5c4452cbeb11610222711&q=London&aqi=yes')
//     .then((response) => response.json())
//     .then((data) => console.log(data));

//     http://api.weatherapi.com/v1/current.json

function getWeather(citys) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citys}&appid=b171e95ed6e12f401d79f0335a710c32&units=metric`)
        .then((response) => {
            if (response.ok) {
                if (document.querySelector('.error').classList.contains('show')) document.querySelector('.error').classList.remove('show')
                return response.json();

            } else { document.querySelector('.error').classList.add('show'); }

        })
        .then((cityData) => {

            console.log(cityData);
            updatePage(cityData)
        })

}


const apikey = 'b171e95ed6e12f401d79f0335a710c32';


let inputTag = document.getElementById('location');


inputTag.addEventListener('change', function fetchFromInput() {
    console.log(this.value, 'text in this input got changed');

    getWeather(this.value)

})


function fetchWeather(lon, lat, apikey) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b171e95ed6e12f401d79f0335a710c32&units=metric`)
        .then((response) => response.json())
        .then((weatherObj) => updatePage(weatherObj));

}

function updatePage(obj) {
    loaderOn()
    console.log(obj);
    const { icon, description, main } = obj.weather[0];
    const { speed } = obj.wind;
    const { temp, humidity, } = obj.main;
    const { all } = obj.clouds;


    location_nfo.innerHTML = `Todays ${obj.name} report`
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`);
    weatherDescription.innerHTML = description;
    tempperature.innerHTML = `${temp}<sup>°</sup>`;
    windSpeed.innerHTML = `${speed}meter/sec`;
    humidity_.innerHTML = `${humidity}%`;
    cloudiness.innerHTML = `${all}%`;
    // setTimeout(() => {
    //     document.querySelector('.error').classList.remove('show')

    // }, 1000);
}


function findUserLocation() {
    const successCallback = (position) => {
        const { latitude, longitude } = position.coords
        console.log(position);
        console.log(longitude, latitude);

        fetchWeather(longitude, latitude);
    };

    const errorCallback = (error) => {
        console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

const loader = document.querySelector("#loader");

function loaderOn() {
    loader.classList.add("loader--hidden")
    setTimeout(() => {
        loader.classList.remove("loader--hidden")
    }, 2200);
}

let footer = document.getElementById('footer');
footer.addEventListener('click', function useLonLat() {
    // loader.className = 'loader--hidden'
    loaderOn()
    findUserLocation()

})