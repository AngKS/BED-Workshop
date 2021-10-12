
const db = require("./databaseConfig")

let User = {

    getUser: (id, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                
                return callback(err, null)
            }
            else {
                console.log('Database Connected!')
                let QUERY = `SELECT * FROM Users`
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