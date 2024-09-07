let key = "61b732ec2ad66c5bdc1c989bb902d94b";

let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let city_search = document.querySelector(".weather_search");

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

const getDateTime = (dt) => {
    const curDate = new Date(dt*1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }

    return new Intl.DateTimeFormat("en-US",options).format(curDate);
}

const getTemperatureInCelcius = (temp) => {
    const celciusTemp = temp - 273.15;
    return celciusTemp.toFixed();
}

const getMinTemp = (temp) => {
    const celciusTemp = temp - 273.15;
    return celciusTemp.toFixed();
}

const getMaxTemp = (temp) => {
    const celciusTemp = temp - 273.15;
    return celciusTemp.toFixed();
}

const getFeelsLikeTemp = (temp) => {
    const celciusTemp = temp - 273.15;
    return celciusTemp.toFixed();
}

let city = "Hyderabad";

city_search.addEventListener('submit',(e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    city = cityName.value;
    
    getWeatherData();

    cityName.value = "";
});

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=61b732ec2ad66c5bdc1c989bb902d94b`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt} = data;

        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;

        w_temperature.innerHTML = `${getTemperatureInCelcius(main.temp)}&deg`;
        w_minTem.innerHTML = `Min: ${getMinTemp(main.temp_min)}&deg`;
        w_maxTem.innerHTML = `Max: ${getMaxTemp(main.temp_max)}&deg`;

        
        w_feelsLike.innerHTML = `${getFeelsLikeTemp(main.feels_like)}&deg`;
        w_humidity.innerHTML = `${main.humidity}&percnt;`
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
        
        
    } catch (error) {
        console.log(error);
        
    }
}


document.body.addEventListener("load", getWeatherData());
