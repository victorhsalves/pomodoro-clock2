require('dotenv').config();
const express = require('express');
const path = require('path');
const { uuid } = require('uuidv4');
const Auth = require('./firebase');
const firebase = require('firebase');
const { restart } = require('nodemon');
const routes = require('./routes');

const app = express();

app.use(express.json()); //express pode utilizar body do tipo json
app.use(express.urlencoded({extended:true}))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(routes);

app.listen(3333); //define porta para ouvir da aplicação

// var userLogged;

// firebase.auth().onAuthStateChanged( (user) => {
//     if(user){
//         userLogged = {
//             email: user.email,
//             uid: user.uid,
//             displayName: user.displayName
//         }
//     } else {
//         userLogged = null;
//     }
// });

// app.get('/projects', (request, response) => {
//     return response.json(projects);
// });

// app.post('/projects', (request, response) => {
//     const { title, owner } = request.body;

//     const id = uuid();

//     const project = {
//         id,
//         title,
//         owner
//     }

//     projects.push(project);

//     return response.json(project);

// });

// app.put('/projects/:id', (request, response) => {
//     const { id } = request.params;

//     const { title, owner } = request.body;

//     const projectIndex = projects.findIndex(project => project.id === id);

//     if(projectIndex < 0){
//         return response.status(400).json({error: "Project not found"});
//     }
    
//     const project = {
//         id,
//         title,
//         owner
//     };

//     projects[projectIndex] = project;

//     return response.json(project);

// });

// app.delete('/projects/:id', (request, response) => {
//     const { id  } = request.params;

//     const projectIndex = projects.findIndex(project => project.id === id);

//     if(projectIndex < 0 ){
//         return response.status(400).json({ error: "Projeto não encontrado"});
//     }

//     projects.splice(projectIndex, 1);

//     return response.status(204).json([]);



// })

// app.post('/Login', (req, res) => {
//     const { email, password } = req.body;

//     Auth.Login(email, password).then((login) => {
//         if(!login.err){
//             res.json({message: 'Sucesso!', user: userLogged})
//         }else{
//             res.status(400).json({err: login.err})
//         }
//     });
// })

// app.post('/SignUp', (req, res) => {
//     const { email, password } = req.body;

//     Auth.SignUp(email, password).then((login) => {
//         if(!login.err){
//             res.json({message: 'Sucesso!'})
//         }else{
//             res.status(500).json({err: login.err})
//         }
//     });
// });

// app.post('/Logout', (req, res) => {
//     Auth.Logout().then((status) => {
//         if(!status){
//             res.json({message: 'Sucesso!'})
//         }else{
//             res.status(500).json({err: status})
//         }
//     });
// });

// app.post('/input', (req, res) => {
//     let name = firebase.auth().currentUser.uid;

//     Auth.Input(name).then((status) => {
//         if(!status){
//             res.json({message: 'Success!'})
//         } else {
//             res.json({err: status})
//         }
//     });

// })






// app.listen(3333, () => {
//     console.log('Backend started')
// });