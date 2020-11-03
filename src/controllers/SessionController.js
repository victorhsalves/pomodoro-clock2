const { json } = require("body-parser");
const { request } = require("express");
const firebase = require('firebase');
const Utils = require('../utils/utils');
const jwt = require('jsonwebtoken');
// const redis = require('redis');
// const JWTR = require('jwt-redis').default;

module.exports = {
    async SignUp(req, res) {

        const { name, username, email, password } = req.body;
        const userRef = firebase.database().ref('users/');

        const hashedEmail = Utils.md5(email);
        var query = userRef.child(hashedEmail);
        query.once("value").then((user) => {
            if (user.exists()) {
                return res.json({ message: 'Email já está sendo utilizado.' });
            } else {
                userRef.child(hashedEmail).set({
                    name: name,
                    username: username + '#' + Utils.shorthash.unique(hashedEmail),
                    email: email,
                    password: Utils.md5(password + hashedEmail),
                    level: 'user'
                }).then(() => {
                    return res.json({ message: 'Success.' })
                }).catch((e) => {
                    return res.json({ err: e })
                })
            }
        }).catch((e) => {
            return res.json({ err: 'Error: ' + e })
        })
    },

    async Login(req, res) {
        const { email, password } = req.body;
        const userRef = firebase.database().ref('users/');

        const hashedEmail = Utils.md5(email);
        const hashedPwd = Utils.md5(password + hashedEmail);

        var query = userRef.child(hashedEmail);
        query.once('value').then((user) => {
            if (!user.exists()) {
                return res.status(400).json({ err: 'User not found.' })
            } else {
                if (user.val().password === hashedPwd) {
                    const token = jwt.sign({
                        userId: hashedEmail,
                        email: email,
                        name: user.val().name,
                        level: user.val().level,
                        pwd: hashedPwd
                    },
                        process.env.TOKEN_SECRET,
                        {
                            expiresIn: process.env.TOKEN_TIME_LIFE
                        });
                    return res.status(200).json({ message: 'Success', token: token });
                } else {
                    return res.status(400).json({ err: 'Usuario ou senha incorretos' });
                }
            }
        }).catch((e) => {
            return res.status(500).json({ err: e });
        })

    },

    async UpdateSession(req, res) {
        const { newPwd } = req.body;
        const { email } = req.user;
        try {
            var token = req.headers.authorization.split(' ')[1];
            var decode = jwt.verify(token, process.env.TOKEN_SECRET);
            decode.pwd = newPwd;
            token = jwt.sign(
                {
                userId: decode.userId,
                email: decode.email,
                name: decode.name,
                level: decode.level,
                pwd: decode.pwd
            }
            , process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_TIME_LIFE });
            console.log('cu')
            return res.status(200).json({ message: token });
        } catch (error) {
            return res.status(500).json({ err: 'Error: ' + error });
        }
    },

    async Logout(req, res) {

    }
}