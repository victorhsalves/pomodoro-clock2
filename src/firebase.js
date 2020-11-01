const { json } = require("body-parser");
const { request } = require("express");

const firebase = require('firebase');
const admin = require('firebase-admin');

var config = {
    apiKey: "AIzaSyDinokqr19R7CjwPGo91HQwASf16uBjY5o",
    authDomain: "task-list-bc037.firebaseapp.com",
    databaseURL: "https://task-list-bc037.firebaseio.com",
    projectId: "task-list-bc037",
    storageBucket: "task-list-bc037.appspot.com",
    messagingSenderId: "1076268697738",
    appId: "1:1076268697738:web:c81d7b01a33765c9dd4573",
    measurementId: "G-XLQ5KX4L6Z"
};
firebase.initializeApp(config);
admin.initializeApp(config);


module.exports.SignUp = (email, password, displayName) => {
    return admin.auth().createUser({
        email: email,
        emailVerified: false,
        phoneNumber: '+55 98992228336',
        password: password,
        displayName: displayName,
        photoURL: null,
        disabled: false
    }).then((user) => {
        return JSON.stringify(user);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            return { err: 'The password is too weak.' };
        } else {
            return { err: errorMessage };
        }
        return { err: error };
    });
}

module.exports.Login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        return JSON.stringify(user);
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/wrong-password') {
            return { err: 'Wrong password.' };
        } else {
            return { err: errorMessage };
        }
        return { err: error };
    });
}

module.exports.Logout = () => {
    return firebase.auth().signOut().catch(function (error) {
        return { err: error };
    });
}

module.exports.Input = (name) => {
    let id = firebase.database().ref().child('administradores').push().key;
    let updates = {};
    updates[id] = name;
    return firebase.database().ref().child('administradores').update(updates).then(() => {
        return {err: 'Success'}
    }).catch((e) => {
        return { err: e}
    });
}

return module.exports;