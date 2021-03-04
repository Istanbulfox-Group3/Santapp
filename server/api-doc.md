# Santapp Application
  
  
## feature : 
 - google maps search 3rd Party API
 - weatherstack 3rd Party API
 - Session with JWT
  
# RESTful endpoints
  
  
  
## GET /
> get todays weather from 3rd party API as home page
  
Response (200 - success)
```json
{
    "name": "Depok",
    "country": "Indonesia",
    "region": "West Java",
    "lat": "-6.689",
    "lon": "107.400",
     "observation_time": "11:58 AM",
    "temperature": 31,
    "weather_code": 116,
    "weather_icons": [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
    ],
    "weather_descriptions": [
      "Partly cloudy"
    ]
}
```
  
Response (500 - Internal Server Error)
```json
    {message : "Internal Server Error"}
```
  
  
  
## GET/recommendation
> Show all recommended restaurant in town
  
Response (200 - success)
```json
[
    {
        "name": "Bunga Rampai",
        "formatted_address": "Jl. Teuku Cik Ditiro No.35, RT.10/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310, Indonesia",
        "price_level": 3,
        "rating": 4.5,
        "user_ratings_total": 2238
    }
]
```
  
Response (500 - Internal Server Error)
```json
    {message : "Internal Server Error"}
```

## POST/register
> Register new account to the app
  
Response (201 - success)
```json
[
    {
        "name": "Reno",
        "domicile" : "Surabaya",
        "email" : "reno@mail.com",
        "password" : "hashedpassword"
    }
]
```
  
Response (500 - Internal Server Error)
```json
    {message : "Internal Server Error"}
```
  

## POST/login
> Log in account to the app
  
Response (200 - success)
```json
[
    {
        "email" : "reno@mail.com",
        "password" : "hashedpassword"
    }
]
```
  
Response (500 - Internal Server Error)
```json
    {message : "Internal Server Error"}
```
  

## POST/logout
> Log out account to the app
  
Response (200 - success)
```json
[
    {
        "email" : "reno@mail.com",
        "password" : "hashedpassword"
    }
]
```
  
Response (500 - Internal Server Error)
```json
    {message : "Internal Server Error"}
```