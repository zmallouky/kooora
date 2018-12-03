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
    const posts = [ 
        {
            id: "fasdsd", 
            title: "first",
            content: "this is the learning process"
        },
        {
            id: "fasdsdqs", 
            title: "tiird",
            content: "this is the learning process"
        },
        {
            id: "fasdsdsds", 
            title: "second",
            content: "this is the learning process"
        },
    ]
    unirest.get('https://apifootball.com/api/?action=get_events&from=2016-10-30&to=2016-11-01&league_id=62&APIkey=dd279fef268763e746b12fbb22e486275299d8c6a982957c97431c201ea8194c')
    .end(function (response) {
        //console.log(response.body);
        
        let filtredQuery  = [];
        
        for(i =0; i < response.body.length ; i++)
        {
            filtredQuery.push(
             
                {
                    id: response.body[i].match_id, 
                    title: response.body[i].match_hometeam_name.concat("-----"+response.body[i].match_awayteam_name),
                    content: response.body[i].match_hometeam_score.concat("-"+response.body[i].match_awayteam_score)
                    
                }
            )
            
        }
            
    
        res.status(200).json( {
        messeage: 'succes',
        posts:  filtredQuery //response.body //posts
    });
    });
 
});

module.exports = app;