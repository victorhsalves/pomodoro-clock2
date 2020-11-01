const { json } = require("body-parser");
const { request } = require("express");
const firebase = require('firebase');
const Task = require('../models/Task');
const Utils = require('../utils/utils');
const Logs = require('./LogController');

module.exports = {

    async ListTasks(req, res) {
        const taskRef = firebase.database().ref('task/');
        taskRef.once("value").then((snapshot) => {
            return res.json(snapshot.val());
        }).catch((e) => {
            return res.json({ err: e });
        });
    },

    async CreateTask(req, res, next) {
        const { title, description } = req.body;
        const { name } = req.user;
        const author = name;

        var taskId = firebase.database().ref().child('tasks').push().key;
        var newTask = {
            title: title,
            author: author,
            description: description,
            date: Utils.getFormattedDate(new Date()),
            timestamp: Date.now()
        }
        return firebase.database().ref('task/' + taskId).set(newTask)
            .then(() => {
                req.body.taskId = taskId;
                req.body.action = 'Criação';
                req.body.date = newTask.date;
                req.body.author = author;
                req.body.timestamp = newTask.timestamp;
                return next()
            })
            .catch((e) => {
                return res.json({ err: 'Falhou1 ' + e })
            })
    },

    async UpdateTask(req, res, next) {

        const { taskId, description, title } = req.body;
        const taskRef = firebase.database().ref('task/');
        const root = firebase.database().ref();

        // fazer validação de usuário
        const { name } = req.user;

        // fazer validação da task
        var date = Utils.getFormattedDate(new Date());

        var query = taskRef.child(taskId);
        query.once("value").then((snapshot) => {
            if (snapshot.exists()) {
                var updates = {};
                if (description) {
                    updates['/description'] = description;
                }
                if (title) {
                    updates['/title'] = title;
                }
                query.update(updates);
                req.body.taskId = taskId;
                req.body.action = 'Edição';
                req.body.date = date;
                req.body.author = name;
                req.body.timestamp = Date.now();
                return next()
            } else {
                return res.json({ message: 'Invalid task id' });
            }
        }).catch((e) => {
            return res.json({ ea: e })
        })
    },

    async RemoveTask(req, res, next) {

        const taskId = req.params.id;
        const { name } = req.user;
        const taskRef = firebase.database().ref('task/');

        // fazer validação da task
        var date = Utils.getFormattedDate(new Date());

        var query = taskRef.child(taskId);
        query.once("value").then((snapshot) => {
            if (snapshot.exists()) {
                try{
                    query.remove();
                    req.body.taskId = taskId;
                    req.body.action = 'Remoção';
                    req.body.date = date;
                    req.body.author = name;
                    req.body.timestamp = Date.now();
                    return next()
                }catch(e){
                    console.log(e)
                }
            } else {
                return res.json({ message: 'Invalid task id' });
            }
        }).catch((e) => {
            return res.json({ e: e })
        })
    }
}