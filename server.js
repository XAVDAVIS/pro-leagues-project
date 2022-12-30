// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const data = require('./data');
const league = require('./models/league');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');


const PORT = process.env.PORT 
const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI);
const db = mongoose.connection;

db.on('error', (err) => console.log('an error occurred with MongoDB: ' + err.message));
db.on('connected', () => console.log(`Connected to MongoDB on ${db.port}`));

// Seed Route 
app.get('/leagues/seed', (req, res ) => {
    league.deleteMany({}, (err) => {
        // create a seperate file for league records 
        league.create(data, (err) => {
            res.redirect('/leagues');
        });
    });
});

            // INDUCES  
// Index

app.get('/leagues', (req, res ) => {
    league.find({}, (err, leagues) => {
        res.render('index', { leagues });
    });
});








app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
})
