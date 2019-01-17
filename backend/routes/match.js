const express = require("express");
const Match = require("../db/match");

const checkAuth = require("../middleware/check-auth");

const router = express.Router()
// save match 
router.post("/save", checkAuth, (req, res, next) => {
  const match = new Match({ // create new match on mongoose with schema predifinded
    hometeam: req.body.hometeam,
    awayteam: req.body.awayteam,
    hometeamScore: req.body.hometeamScore,
    awayteamScore: req.body.awayteamScore,
    match_time: req.body.match_time,
    creator: req.userData.userId
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
        message: "failed to save match"
      })
    });
});
//list all saved match
router.get("", checkAuth, (req, res, next) => {
  Match.find({ creator: req.userData.userId }).then(documents => {
    //console.log(documents);
    res.status(201).json(documents
      /*{ 
      message: 'fetched succesfully',
      savedMatch: documents
    }*/)
  }).catch(error => {
    res.status(500).json({
      message: "failed to get favorite match"
    })
  });
});

//delete saved match
router.delete("/delete/:id", (req, res, next) => {
  Match.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "match deleted" });
  })
    .catch(error => {
      res.status(500).json({
        message: "failed to delete the match"
      })
    });
});


module.exports = router;

