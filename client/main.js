
const base_url = 'http://localhost:3000'

$('document').ready(() => {

    checkLocalStorage()
    // login button
    $('#btn-login').on('click', (e) => {
        e.preventDefault()
        login()
    })
    // sign up button
    $('#btn-reg').on('click', (e) => {
        e.preventDefault()
        signUp()
    })

    $('#btn-edamam').on('click', (e) => {
        e.preventDefault()
        showApiEdamam()
    })

    $('#btn-api-edamam').on('click', (e) => {
        e.preventDefault()
        doApiEdamam()
    })

    $('#btn-place-search').on('click', (e) => {
        e.preventDefault()
        placeSearch()
    })
    
    $('#weather-btn').on('click', (e) => {
        e.preventDefault()
        showWeather()
    })


})


// function home () {
//     $.ajax({
//         method : 'get',
//         url : base_url + '/',
//         headers : {
//             access_token : localStorage.access_token
//         }
//     })
// }

function showWeather() {
    $('#table-head').hide()
    $('#api-edamam').hide()
    $('#home-page').hide()
    $('#login-page').hide()
    $('#api-place-search').hide()
    $('#weather-api').show()

    $.ajax({
        method : 'get',
        url : base_url + '/weather',
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(data => {
        console.log(data);
        const {
            country,
            lat,
            lon, name, observation_time, region, temperature, weather_descriptions,
            weather_icons} = data.weather
        // weather_description = weather_description.join('')
        // weather_icon = weather_icon.join('')

        $('#weather-content').append(`
        <img src="${weather_icons}" alt="can not show icon" style="width:200px;margin:10px;">
        <h2> ${country} </h2>
        <h3> ${name}, ${region} </h3>
        <br>
        <br>
        <h1>${temperature}° C </h1>
        <p>observation time : ${observation_time} <br> ${weather_descriptions}</p>
        `)


    })
    .fail(err => {
        console.log(err);
    })
}


function placeSearch () {
    $('#table-head').hide()
    $('#api-edamam').hide()
    $('#home-page').hide()
    $('#login-page').hide()
    $('#api-place-search').show()
    $('#weather-api').hide()
    
    $.ajax({
        method : 'get',
        url : base_url + '/recommendation',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(data => {
        console.log(data, "<<<<<< INI DATA");
        console.log(data.allResto[1].name + "<<<<<<<");
        for (let i = 0 ; i <= data.allResto.length; i++) {
            // console.log(data.allResto[i].name + "<<<<<<<");
            $('#restaurants-content').append(
                `
                <tbody>
                <tr>
                <td style="width: 5%;text-align: center;">${i+1}</td>
                <td style="width: 25%;text-align: center;">${data.allResto[i].name}</td>
                <td style="width: 40%;text-align: center;">${data.allResto[i].formatted_addres}</td>
                <td style="width: 10%;text-align: center;">${data.allResto[i].rating}</td>
                <td style="width: 10%;text-align: center;">${data.allResto[i].user_ratings_total}</td>
                <td style="width: 10%;text-align: center;">${data.allResto[i].price_level}</td>
                </tr>
                </tbody>
                `)
            }
        })
        .fail(err => {
            console.log(err);
        })
    }
    
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        // console.log("fetching");
        // console.log(localStorage.access_token, "<<<< ACCESS TOKEN");
        console.log(profile);
        const id_token = googleUser.getAuthResponse().id_token
        console.log(id_token, "ACCESS TOKEN GOOGLE");
        $.ajax({
            method : 'post',
            url : base_url + '/oauth',
            data : {
                email : profile.getEmail(),
                name : profile.getName(),
                password : (new Date().toISOString()) + profile.getEmail(),
                access_token : id_token
            }
        })
        .done (data => {
            console.log("masuk then line 91");
            // localStorage.setItem('access_token', id_token)
            
        })
        .fail(err => {
            console.log("error");
            console.log(err);
        })
        
    }
    
    function checkLocalStorage() {
        if (localStorage.access_token) {
            $('#home-page').show()
            $('#login-page').hide()
            $('#api-edamam').hide()
            $('#api-place-search').hide()
            $('#weather-api').hide()
        }
        else {
            $('#home-page').hide()
            $('#login-page').show()
            $('#api-edamam').hide()
            $('#api-place-search').hide()
            $('#weather-api').hide()
        }
    }
    
    function login() {
        console.log("berusaha login");
        $.ajax({
            url: base_url + '/login',
            method: "POST",
            data: {
                email: $('#email-login').val(),
                password: $('#pass-login').val()
            }
        })
        .done(response => {
            console.log(response);
            // localStorage.setItem('access_token', response.access_token)
            localStorage.access_token = response.access_token
            console.log(localStorage.access_token, "<<<<<< LOCAL STORAGE ACCESS TOKEN");
            checkLocalStorage()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            $('#email-login').val('')
            $('#pass-login').val('')
            $('.login-title').text('Welcome to SantAPP')
        })
    }
    
    
    function signUp() {
        $.ajax({
            url: base_url + "/register",
            method: "POST",
            data: {
                name: $('#name-reg').val(),
                city: $('#city-reg').val(),
                email: $('#email-reg').val(),
                password: $('#pass-reg').val(),
            }
        })
        .done(response => {
            // $('#tab-1').prop('checked')
            $('.login-title').text('sign up success, please sign in')
            console.log(response);
            checkLocalStorage()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            $('#name-reg').val(''),
            $('#city-reg').val(''),
            $('#email-reg').val(''),
            $('#pass-reg').val('')
        })
    }
    
    function showApiEdamam() {
        $('#table-head').hide()
        $('#api-edamam').show()
        $('#home-page').hide()
        $('#login-page').hide()
        $('#api-place-search').hide()
        $('#weather-api').hide()
    }
    
    function doApiEdamam() {
        console.log($('#input-query-edamam').val());
        $.ajax({
            url: base_url + '/apis/edamam',
            method: "POST",
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                searchFood: $('#input-query-edamam').val()
                // searchFood : "chicken"
            }
        })
        .done(response => {
            $('#table-head').show()
            console.log(response.hints, "ini respon.hints");
            response.hints.forEach((e)=>{
                let eachNutrients = ''
                for (const key in e.food.nutrients){
                    eachNutrients += `${key} : ${e.food.nutrients[key]}g | `
                }
                $('#table-content').append(`
                <tbody>
                <tr>
                <td><img src="${e.food.image}" alt="sorry, no image available"></td>
                <td>${e.food.category}</td>
                <td>${e.food.categoryLabel}</td>
                <td>${e.food.label}</td>
                <td>${eachNutrients}</td>
                </tr>
                </tbody>
                `
                )
            })
        })
        .fail(err => {
            console.log(err);
        })
    }
    
    
    
    
    
    function logout() {    
        localStorage.removeItem('access_token')
        
        checkLocalStorage()
    }