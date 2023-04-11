export default class WeatherService {
    
    getResource = async (name) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=f26be28f60c928500e0727540ee3151b`);
        
        return res.json();
    }

    getCityByName = async (city) => {
        const res = await this.getResource(city);
        return this._transformCity(res);
    }

    _transformCity = (city) => {
        return {
            name: city.name,
            country: city.sys.country,
            temp: Math.round(city.main.temp),
            humidity: city.main.humidity,
            windSpeed: Math.round(city.wind.speed),
            weatherMain: city.weather[0].main,
            weatherDescr: city.weather[0].description,
            coordLat: city.coord.lat,
            coordLon: city.coord.lon  
        }
    }
}