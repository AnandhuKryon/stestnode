const express = require('express')
var bodyParser = require("body-parser")
var app = express();
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(express.json())
// Configuring the database
const dbConfig = require('./config/database');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.use(function (req, res, next) {

    var allowedOrigins = ['http://localhost:4200', 'https://demo-webs.com', 'http://192.168.1.15', 'https://stansonrubber.com'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', "*");
    }
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

require("./app/routes/chatRoute")(app)


app.listen(process.env.PORT || 3020, console.log('app started'));

module.export = {
    app: app
};