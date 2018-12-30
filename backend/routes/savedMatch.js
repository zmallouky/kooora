const express = require("express");
const SavedMatch = require("../db/savedMatch");

const router = express.Router()

router.get("/saveMatch", (req, res, next) => {
    const match = new SavedMatch({ // create new match on mongoose with schema predifinded
        hometeam: "toto",
        awayteam: "toto",
        hometeamScore: "toto",
        awayteamScore: "toto"
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

