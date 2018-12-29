const express = require("express");
var unirest = require('unirest');


const router = express.Router()

router.get("/match", (req, res, next) => {
    const recivedDate = req.body;
    console.log(recivedDate);
    res.status(201).json({
        messeage: 'Recived Date succesefully'
    });
    next();
});
router.get("", (req, res, next) => {
    unirest.get('https://apifootball.com/api/?action=get_events&from=2018-12-01&to=2018-12-02&league_id=66&APIkey=14193bebbace1f330420132aed18ec62f6a202fa5d7b34e4f82eb9a70bf4212b')
    .end(function (response) {
    //console.log(response.body);
    res.status(200).json( {
    messeage: 'succes',
    posts:  response.body  //posts
    });
    });
});

module.exports = router;

/*** *
 * database login
 * login : elbo
 * mdp : ox7Q39FSvkpyvkMw 
*/