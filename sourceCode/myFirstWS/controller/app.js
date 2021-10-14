const express = require("express")
const User = require("../model/user.js")

const app = express()
app.use(express.json())
app.use(express.urlencoded())

// API Endpoints

// Endpoint to get ALL users
app.get('/api/users', (req, res) => {

    User.getAllUsers((err, result) => {
        if (!err) {
            res.status(200).send(result)
        }
        else {
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

// Endpoint for inserting a new user into the database
app.post('/api/user', (req, res) => {
    let username = req.body.username
    let email = req.body.email
    let course = req.body.course
    let age = req.body.age
    let password = req.body.password

    User.addUser(username, email, course, age, password, (err, result) => {
        if (!err) {
            console.log(result)
            res.status(200).send(result + ' records inserted!')
        }
        else {
            res.status(err.statusCode).send("Server Error!")
        }
    })
})

// Endpoint for updating existing user in database
app.put('/api/user/:userid', (req, res) => {
    let userID = req.params.userid
    let email = req.body.email
    let password = req.body.password

    User.updateUser(userID, email, password, (err, result) => {
        if (!err) {
            res.status.send(result + ' record(s) updated!')
        }
        else {
            res.status(err.statusCode).send('Server Error!')
        }
    })
})

module.exports = app