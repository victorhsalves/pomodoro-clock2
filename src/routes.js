const { Router } = require('express');
const SessionController = require('./controllers/SessionController')
const UserController = require('./controllers/UserController');
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

// Users
routes.post('/ChangePassword', session.User, UserController.ChangePassword, SessionController.UpdateSession);

// Tasks
routes.get('/ListTasks', TaskController.ListTasks);
routes.post('/CreateTask', session.User, TaskController.CreateTask, LogController.WriteLog);
routes.post('/UpdateTask', session.User, TaskController.UpdateTask, LogController.WriteLog);
routes.delete('/RemoveTask/:id', session.Administrator,TaskController.RemoveTask, LogController.WriteLog);

// Log
routes.post('/WriteLog',LogController.WriteLog);
routes.get('/ListLogs/:taskId', session.Administrator, LogController.ListLogs);

// Files
routes.get('/ListFiles', FilesController.ListFiles);
routes.post('/SendFile', session.Administrator, multer(multerConfig).single('file'), FilesController.SaveFilesMetadata) ;

module.exports = routes;