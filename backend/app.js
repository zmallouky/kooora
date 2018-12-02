const express = require('express');

const app = express();

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
    res.status(200).json( {
        messeage: 'succes',
        posts: posts
    });
});

module.exports = app;