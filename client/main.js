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

})

function placeSearch () {
    $('#table-head').hide()
    $('#api-edamam').hide()
    $('#home-page').hide()
    $('#login-page').hide()
    $('#api-place-search').show()

    $.ajax({
        method : 'get',
        url : base_url + '/recommendation',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(data => {
        console.log(data);
        for (let i = 1 ; i <= data.length; i++) {
            $('#restaurants-content').append(
                `<tr>
                    <td style="width: 5%;text-align: center;">${i}</td>
                    <td style="width: 25%;text-align: center;">${data[i].name}</td>
                    <td style="width: 40%;text-align: center;">${data[i].formatted_addres}</td>
                    <td style="width: 10%;text-align: center;">${data[i].rating}</td>
                    <td style="width: 10%;text-align: center;">${data[i].user_rating_total}</td>
                    <td style="width: 10%;text-align: center;">${data[i].price_level}</td>
                </tr>
            `)
        }
    })
    .fail(err => {
        console.log(err);
    })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // $.ajax({
    //     method : 'post',
    //     url : base_url + '/oauth',
    //     data {

    //     }
    // })

}

function checkLocalStorage() {
    if (localStorage.access_token) {
        $('#home-page').show()
        $('#login-page').hide()
        $('#api-edamam').hide()
        $('#api-place-search').hide()
    }
    else {
        $('#home-page').hide()
        $('#login-page').show()
        $('#api-edamam').hide()
        $('#api-place-search').hide()
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