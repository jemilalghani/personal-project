const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');

require('dotenv').config();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const pixalController = require('./controllers/pixalController');
const messageController = require('./controllers/messageController');
const adminController = require('./controllers/adminController');

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
app.patch('/api/me/:id', userController.updateUsername);
app.post('/api/logout', authController.logout);
app.get('/auth/callback', authController.handleCallback);

app.get('/api/pixals/:user_id', pixalController.getPixal);
app.get('/api/pixals/:user_id/:date', pixalController.checkPixal);
app.post('/api/pixals', pixalController.postPixal);

app.get('/api/messages/:user_id/:date', messageController.readone)
app.get('/api/messages/:user_id', messageController.read);
app.post('/api/messages/:user_id', messageController.create);
app.delete('/api/messages/:user_id/:id', messageController.delete);

app.post('/api/email', userController.sendEmail);

app.post('/api/login', adminController.login);
app.post('/api/register', adminController.register);
app.post('/api/adminlogout', adminController.logout);
app.get('/api/count', adminController.count);
app.get('/api/usercount', adminController.useract);
app.get('/api/email/:date', adminController.submittedToday);
app.get('/api/emailusers/:emailOne/:emailTwo', adminController.emailusers);
app.get('/api/users', adminController.users);

// app.get('http://quotes.rest/qod.json');

app.use( express.static( `${__dirname}/../build` ) );

const SERVER_PORT = 4000;
app.listen(SERVER_PORT, ()=>{
    console.log(`Tuning into Port ${SERVER_PORT} 📡`)
})

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
