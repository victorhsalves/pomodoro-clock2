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
return module.exports;