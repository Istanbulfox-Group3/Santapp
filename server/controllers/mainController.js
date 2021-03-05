const axios = require('axios')

const {User} = require('../models')
const jwt = require('jsonwebtoken')


class MainController {
    static home (req, res, next) {
        res.status(200).json({message : "success"})
    }


    static weather (req, res, next) {
        let access_token = req.headers.access_token
        let decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY)
        let city = decoded.city
        axios({
            method : 'get',
            url : `http://api.weatherstack.com/current?access_key=0811dd37f46e3bfddd4d420c3ed53b95&query=${city}`
        })
        .then (data => {
            let weather = {
                "name": data.data.location.name,
                "country": data.data.location.country,
                "region": data.data.location.region,
                "lat": data.data.location.lat,
                "lon": data.data.location.lon,
                "observation_time": data.data.current.observation_time,
                "temperature": data.data.current.temperature,
                "weather_code": data.data.current.weather_code,
                "weather_icons": data.data.current.weather_icons,
                "weather_descriptions": data.data.current.weather_descriptions
            }
            res.status(200).json({weather})
        })
        .catch (err => {
            res.send(err) // nanti dioper ke error handler
        })
    }


    static APIedamam(req,res,next){
        console.log(req.body);
        axios({
            method :'get',
            url : `https://api.edamam.com/api/food-database/v2/parser?ingr=${req.body.searchFood}&app_id=${process.env.APP_ID_EDAMAM}&app_key=${process.env.APP_KEY_EDAMAM}`
        })
        .then(responseAPI=>{
            console.log(responseAPI.data, "ini di controller-------");
            res.status(200).json(responseAPI.data )
            
        })
        
        .catch(err=>{
            next(err)
            console.log(err);
        })
    }

    static recommendation (req, res, next) {
        let access_token = req.headers.access_token
        let decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY) // secret keynya nanti diganti sesuai dengan backend server
        let city = decoded.city
        axios({
            method : 'get',
            url : `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${city}&key=AIzaSyD37Fcnmvkc9SmOpKVB1LHd1SzTnDrC5_s`
        })
        .then(data => {
            let allResto = []
            let toFetch = data.data.results
            toFetch.forEach(el => {
                let price_level = el.price_level ? el.price_level : "no data"
                let resto = {
                    name : el.name,
                    formatted_addres : el.formatted_address,
                    price_level,
                    rating : el.rating,
                    user_ratings_total : el.user_ratings_total
                }
                allResto.push(resto)
            });
            allResto.sort((a, b) => parseFloat(b.user_ratings_total) - parseFloat(a.user_ratings_total));
            console.log(allResto);
            console.log("asdasdad");
            res.status(200).json({allResto})
        })
        .catch(err => {
            res.send(err)

        })
    }
}

module.exports = MainController