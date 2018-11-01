const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

massive(process.env.CONNECTION_STRING).then(database=>{
    app.set('db', database)
}).catch(error=>{
    console.log('error with massive', error)
});

app.get('/api/me', userController.getUserData);
app.post('/api/logout', authController.logout);
app.get('/auth/callback', authController.handleCallback);

const SERVER_PORT = 4000;
app.listen(SERVER_PORT, ()=>{
    console.log(`Tuning into Port ${SERVER_PORT} 📡`)
})
