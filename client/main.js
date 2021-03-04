// const UserController = require('../server/controllers/userController')
// const myURL = 'http://localhost:3000/'

// $(document).ready(() => {



// })

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     // console.log('Name: ' + profile.getName());
//     // console.log('Image URL: ' + profile.getImageUrl());
//     // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
//     $.ajax({
//         url : myURL + 'googleoauth',
//         method : 'post',
//         data : {
//             name : profile.getName(),
//             email : profile.getEmail()
//         }
//     })
//     .done (response => {
//         console.log("sukses");
//     })
//     .fail(err => {
//         console.log(err);
//     })
// }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//     console.log('User signed out.');
//     });
// }