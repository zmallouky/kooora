const express = require("express");
const Match = require("../db/match");

const router = express.Router()

router.post("/save", (req, res, next) => {
  console.log(req.body.hometeam);
  console.log(req.body.awayteam);
    const match = new Match({ // create new match on mongoose with schema predifinded
        hometeam: req.body.hometeam,
        awayteam: req.body.awayteam,
        hometeamScore: req.body.hometeamScore,
        awayteamScore: req.body.awayteamScore
      });
      match.save() //save match to db
        .then(result => {
          res.status(201).json({ //successfully saved the match
            message: 'Match saved',
            result: result
          });
        })
        .catch(err => { // failed to save match 
          res.status(500).json({
            error: err
          })
        });
});



module.exports = router;

