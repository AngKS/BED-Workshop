const express = require("express")
const User = require("../model/user.js")

const app = express()

// API Endpoints

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