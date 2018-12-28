const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Login = require('./db/login')

const loginRoutes = require('./routes/userLogin');

const app = express();

mongoose.connect("mongodb+srv://elbo:ox7Q39FSvkpyvkMw@cluster0-vm6na.mongodb.net/kooora-db?retryWrites=true")
.then( () => {
    console.log("Connected succefuly to db");
})
.catch( () => {
    console.log("failed to connect to db");
});


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use((req, res ,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next(); 
});

app.use("/api/login/", loginRoutes);

const login = new Login({
    mail: 'anas',
    password: 'elbo'
});
login.save();

module.exports = app;
