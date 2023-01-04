// Dependencies 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const data = require('./data');
const league = require('./models/league');
require('dotenv').config();



app.set('view engine', 'ejs');


const PORT = process.env.PORT 
const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI);
const db = mongoose.connection;

db.on('error', (err) => console.log('an error occurred with MongoDB: ' + err.message));
db.on('connected', () => console.log(`Connected to MongoDB on ${db.port}`));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


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
        res.render('index.ejs', { leagues });
    });
});

// New 
app.get('/leagues/new', (req, res ) => {
    res.render('new.ejs');
});

// Delete 
app.delete('/leagues/:id', (req, res) => {
    league.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/leagues');
        // anytimes the data changes we res.redirect (update, create, delete etc)
    });
});

// Update 
app.put('/leagues/:id', (req, res) => {
    league.findByIdAndUpdate(req.params.id, req.body, {new: true }, (err, leagues) => {
        res.redirect(`/leagues/${req.params.id}`)
    });
});

// Create 
app.post('/leagues', (req, res ) => {
    league.create(req.body, (err, leagues) => {
        console.log(err)
        res.redirect('/leagues');
    });
});

// Edit 
app.get('/leagues/:id/edit', (req, res ) => {
    league.findById(req.params.id, (err, leagues) => {
        res.render('edit.ejs', { leagues });
    });
});

// Show 
app.get('/leagues/:id', (req, res ) => {
    league.findById(req.params.id, (err, leagues) => {
        res.render('show.ejs', { leagues });
    });
});




app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
})
