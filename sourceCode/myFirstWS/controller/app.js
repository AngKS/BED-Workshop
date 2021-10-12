const express = require("express")
const User = require("../model/user.js")

const app = express()

// API Endpoints

// Endpoint to get ALL users
app.get('/api/users', (req, res) => {
    
    User.getAllUsers((err, result) => {
        if (!err){
            res.status(200).send(result)
        }
        else{
            res.status(500).send("Internal Server Error")
        }
    })
})

// Endpoint to get specific user by UserID
app.get('/api/user/:userID', (req, res) => {
    let userID = req.params.userID

    User.getUser(userID, (err, result) => {
        if (!err) {
            res.status(200).send(result)
        }
        else {
            res.status(500).send("Internal Server Error")
        }
    })
})
module.exports = app