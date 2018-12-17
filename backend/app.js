const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
var unirest = require('unirest');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use((req, res ,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next(); 
});

app.use("/api/posts", (req, res, next) => {

    unirest.get('https://apifootball.com/api/?action=get_events&from=2018-12-01&to=2018-12-02&league_id=109&APIkey=48e740cf97eecc9c1692f5b2d6bde1e90123ba1e5dc5c6699c7f38c9179c9e8f')
    .end(function (response) {
        //console.log(response.body);
        
        let filtredQuery  = [];
        
        for(i =0; i < response.body.length ; i++)
        {
            filtredQuery.push(
             
                {
                    id: response.body[i].match_id,
                    hometeam: response.body[i].match_hometeam_name,
                    awayteam: response.body[i].match_awayteam_name,
                    hometeamScore: response.body[i].match_hometeam_score,
                    awayteamScore: response.body[i].match_awayteam_score
                    
                }
            )
            
        }
            
    
        res.status(200).json( {
        messeage: 'succes',
        posts:  response.body  //posts
    });
    });
 
});

module.exports = app;