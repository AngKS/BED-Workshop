const app = require("./controller/app.js")

let port = 8081

const server = app.listen(port, () => {
    console.log("Server is running at Port: " + port)
})