const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    image: {
        type: String, 
        required: false
    }, 
    founded: {
        type: String, 
        required: true
    }, 
    teams: {
        type: String, 
        required: true
    }, 
})

module.exports = mongoose.model('leagues', leagueSchema);