const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    hometeam: { type: String, required: true },
    awayteam: { type: String, required: true },
    hometeamScore: { type: String, required: false },
    awayteamScore: { type: String, required: false },
    match_time: { type: String, required: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Match', userSchema);