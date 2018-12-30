
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    hometeam: { type: String, required: true },
    awayteam: { type: String, required: true },
    hometeamScore: { type: String, required: true },
    awayteamScore: { type: String, required: true }
});


module.exports = mongoose.model('SavedMatch', userSchema);