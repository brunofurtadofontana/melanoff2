export default async function getCurrentWeather(locationCoords){
    //console.log(locationCoords);

    const lat =  locationCoords.latitude
    const log =  locationCoords.longitude

    const axios = require('axios')
    var results = []
    try{
    //console.log(`http://api.openweathermap.org/data/2.5/weather?lat=-27.0990497&lon=-52.6452722&appid=6e2f966857d6fcace1d7be48ede3d56d`)
    //https://api.openweathermap.org/data/2.5/onecall?lat=-27.0990497&lon=-52.6452722&exclude=hourly,daily&appid=6e2f966857d6fcace1d7be48ede3d56d
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=6e2f966857d6fcace1d7be48ede3d56d&lang=pt_br`)
    .then((response)=>{
        const data = response.data
        const locationName = (data.sys.country + ', ' + ' ' + data.name)
        const temperatureMin = data.main.temp_min
        const temperatureMax = data.main.temp_max
        const wind = data.wind.speed
        const humidity = data.main.humidity
        //const clouds = data.clouds
        const currentTemperature = data.main.temp
        const icon = data.weather
        results = [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity, icon]
        // [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity, rain, icon]
        //console.log(data)
    })
    return results

    }catch(err){
        console.log(err)
    }
}

