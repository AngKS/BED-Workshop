
const db = require("./databaseConfig")

let User = {

    getAllUsers: (callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            }
            else {
                console.log('Database Connected')
                let QUERY = `SELECT * FROM Users`
                conn.query(QUERY, (err, result) => {
                    conn.end()
                    if (err) {
                        console.log('Query Error')
                        return callback(err, null)
                    }
                    else {
                        console.log('Query Success!')
                        return callback(null, result)

                    }
                })
            }
        })
    },

    getUser: (id, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            }
            else {
                console.log('Database Connected!')
                let QUERY = `SELECT * FROM Users WHERE userID=?`
                conn.query(QUERY, [id], (err, result) => {
                    conn.end()
                    if (err) {
                        console.log('Query Error')
                        return callback(err, null)
                    }
                    else {
                        console.log('Query Success!')
                        return callback(null, result)

                    }
                })
            }
        })
    },

    addUser : (username, email, course, age, password, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err){
                return callback(err, null)
            }
            else{
                console.log('Database Connected!')
                let QUERY = `INSERT INTO Users(username, email, course, age, password) VALUES (?, ?, ?, ?, ?)`
                conn.query(QUERY, [username, email, course, age, password], (err, result) => {
                    conn.end()
                    if (err){
                        console.log('Query Error!')
                        return callback(err, null)
                    }
                    else{
                        console.log('Query Success!')
                        return callback(null, result.affectedRows)
                    }
                })
            }
        })
    },

    updateUser : (userid, email, password, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err){
                return callback(err, null)                
            }
            else{
                console.log('Database Connected!')
                let QUERY = `UPDATE Users SET email=?, password=? WHERE userID=?`
                conn.query(QUERY, [email, password, userid], (err, result) => {
                    conn.end()
                    if (err){
                        console.log(err)
                        return callback(err, null)
                    }
                    else{
                        console.log('No. of records successfully updated: ' + result.affectedRows)
                        return callback(null, result.affectedRows)
                        
                    }
                })
            }
        })
    },

    deleteUser : (userID, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err){
                console.log('Connection error!')
                return callback(err, null)
            }
            else{
                console.log('Database Connected!')
                let QUERY = `DELETE FROM Users WHERE userID = ? `
                conn.query(QUERY, [userID], (err, result) => {
                    conn.end()
                    if (err){
                        console.log('Query Error')
                        return callback(err, null)
                    }
                    else{
                        console.log('Query Success!')
                        console.log('Successfully deleted ' + result.affectedRows + ' record(s)')
                        return callback(null, result.affectedRows)
                    }
                })
                
            }
        })
    }
}
module.exports = User