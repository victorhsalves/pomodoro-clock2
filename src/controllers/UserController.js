const { json } = require("body-parser");
const { request } = require("express");
const firebase = require('firebase');
const Utils = require('../utils/utils');

module.exports = {
    ChangePassword(req, res, next) {
        const { password, newPwd } = req.body;
        const { email, pwd: userPwd } = req.user;
        const hashedEmail = Utils.md5(email);
        if (userPwd == Utils.md5(password + hashedEmail)) {
            const userRef = firebase.database().ref('users');
            var query = userRef.child(hashedEmail);
            query.once('value').then((snapshot) => {
                if (!snapshot.exists()) {
                    return res.json({ err: 'Erro: User not found' })
                } else {
                    var update = Utils.md5(newPwd + hashedEmail);
                    var updates = {};
                    updates['/password'] = update;
                    return query.update(updates).then(() => {
                        req.newPwd = update;
                        next();
                    }).catch((e) => {
                        return res.json({ err: 'Erro: ' + e });
                    });
                }
            }).catch((e) => {
                return res.json({ err: 'Erro: ' + e });
            })
        } else {
            return res.json({ err: 'Erro: Invalid password' });
        }
    }
}