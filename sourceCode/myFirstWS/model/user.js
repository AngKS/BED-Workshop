
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
    }
}
module.exports = User