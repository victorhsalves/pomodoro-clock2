const { Router } = require('express');
const SessionController = require('./controllers/SessionController')
const TaskController = require('./controllers/TaskController')
const LogController = require('./controllers/LogController')
const FilesController = require('./controllers/FilesController')
const session = require('./config/session')
const multer = require('multer');
const multerConfig = require('./config/multer')

const routes = Router();

// Session
routes.post('/SignUp', SessionController.SignUp);
routes.post('/Login', SessionController.Login);
routes.post('/Logout', SessionController.Logout);

// Tasks
routes.get('/ListTasks', TaskController.ListTasks);
routes.post('/CreateTask', session.User, TaskController.CreateTask, LogController.WriteLog);
routes.post('/UpdateTask', session.User, TaskController.UpdateTask, LogController.WriteLog);
routes.delete('/RemoveTask/:id', session.Administrator,TaskController.RemoveTask, LogController.WriteLog);

// Log
routes.post('/WriteLog',LogController.WriteLog);

// Files
routes.get('/ListFiles', FilesController.ListFiles);
routes.post('/SendFile', session.Administrator, multer(multerConfig).single('file'), FilesController.SaveFilesMetadata) ;

module.exports = routes;