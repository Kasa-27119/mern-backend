// main js file for the backend - step 1 & 2

// require dotenv 
require('dotenv').config()

// bring express
const express = require('express');

// require mongoose
const mongoose = require('mongoose');

// setting up a variable of app to the run the express method
const app = express();

// set up port - listen for changes on the port
const port = 4000;

// import routes
const workoutRoutes = require('./routes/workouts')

// use json with express
app.use(express.json())

// log out path and method of each request
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// attach the routes to the app
app.use('/api/workouts', workoutRoutes) 
//define base route, attaches to localhost eg. localhost - app, /api/workouts/ - uri, attach routes to them '/'

// bring username and password
const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD

// bring in mongodb connection string
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.ohzdmcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// define the home route for the backend
app.get("/", (req, res) => { //home, request + response
    // what happens at that route
    res.send("hello this is your express server")
})

// listen for changes on the backend port
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
})

// mongoose connect
mongoose.connect(mongoURI)
    .then(() => {
        console.log('connected to mongodb atlas')
    })
    .catch((err) => {
        console.error('error connecting to mongodb atlas:', err)
    })