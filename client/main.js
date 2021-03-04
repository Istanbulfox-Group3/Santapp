

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

})

function checkLocalStorage() {
    if (localStorage.access_token) {
        $('#home-page').show()
        $('#login-page').hide()
        $('#api-edamam').hide()
    }
    else {
        $('#home-page').hide()
        $('#login-page').show()
        $('#api-edamam').hide()
    }
}

function login() {
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
            localStorage.access_token = response.access_token
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

    $('#api-edamam').show()
    $('#home-page').hide()
    $('#login-page').hide()
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