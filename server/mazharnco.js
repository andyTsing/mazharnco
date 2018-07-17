//npm init
//install nodemailer
//install express.js
//install ejs
//install cors
//install body-parser
//create email.js
//create model
//create route
// npm install pm2 -g


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const contacts = require('./routes/contact');
const menus = require('./routes/menu');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, function (err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
    } else {
        console.log('Successfully connected to MongoDB');
    }
});

var app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './views')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", contacts);
app.use("/api", menus);

app.get('*', function (req, res) {
    res.render(path.join(__dirname, './views/index.html')); // load our public/index.html file
});

const port =  process.env.PORT;

app.listen(port, function () {
    console.log('Server started on port ' + port);
});