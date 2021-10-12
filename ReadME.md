# S.E.E.D Back-End Web Development Workshop

In this workshop, we will be understand how to implement and combine data persistence and a simple web service to develop a simple application backend service.

## [Powerpoint Slides](https://docs.google.com/presentation/d/18_1yieS9Ya9JO49QSkv2flmngZD3-s4gRMsGNwQC-NQ/edit?usp=sharing "Presentation Slides")

## Topics covered
* What is MVC
* Setting up Persistent Storage Source using MySQL
* Setting up the application directory and files
* Defining & Creating database Connection
* Creating main server in the root folder
* Defining the API Endpoints
* Creating functions for database access
* Creating **GET** Method for retrieving User data
* Creating **POST** Method for inserting and retrieving User data
* Creating **DELETE** method for deleting User data
* Creating **UPDATE** Method to update User data


we will be designing our web service based on the Model-View-Controller (MVC) Design with the above API endpoints.

## What is MVC?
![MVC Model](https://github.com/AngKS/BED-Workshop/blob/main/assets/MVCmodel.png?raw=true)

**MVC** is a simple architecture where all components are seperated into 3 classes:
* ### Model
  The Model is the file that contains code to interact with the database.
* ### View
  The View is the components that will display the model to the user.
* ### Controller
  The Components that will handle any interaction with the user.

### Example Scenario of processing an MVC request


## Setting Up Persistent Storage Source With MySQL

We will first use MySQL to create the database Schema and tables.

1. ### Create a Schema
   
    ![Creating Schema](https://github.com/AngKS/BED-Workshop/blob/main/assets/createSchema.png?raw=true)
    
    Locate the Create Schema icon on the top-left corner of MySQL workbench.
2. ### Enter Schema Name

    ![Schema Name](https://github.com/AngKS/BED-Workshop/blob/main/assets/schemaName.png?raw=true)

    Once you'e clicked on the Create Schema icon, Enter **userDatabase** as the Schema name and click *apply*.
3. ### Create Table
   
    ![Creating Table](https://github.com/AngKS/BED-Workshop/blob/main/assets/createTable.png?raw=true)

    Right-click **userDatabase** schema on the left-side pane and select **Create Table**.
4. ### Enter table Name and columns
   
    ![Add tableName and Columns](https://github.com/AngKS/BED-Workshop/blob/main/assets/tableInfo.png?raw=true)

    Enter the **Table Name**, **Column Names** and **Column Datatypes** and click *Apply* on the bottom-right corner.
5. ### Add values into table
   
    ![Input Values](https://github.com/AngKS/BED-Workshop/blob/main/assets/addValues.png?raw=true)

    Input the first 2 rows of values (excluding the last column *created_at*)


## Setting up the application directory and files

1. We will first create a folder called **myFirstWS**.
   
   ![Create myFirstWS folder](https://github.com/AngKS/BED-Workshop/blob/main/assets/projectfolder.png?raw=true)
2. Open the folder you just created in VScode; create another 2 folders: **controller** and **model**

![Create 2 sub-folders: controller & model](https://github.com/AngKS/BED-Workshop/blob/main/assets/modelAndController.png?raw=true)
3. Right-click on the explorer pane empty space or press <kbd>Ctrl</kbd> + <kbd>`</kbd> to open up the integrated terminal.
4. Run the following code in the integrated terminal to setup and install the necessary packages for your project.
   ```
   npm init
   npm install mysql2 body-parser express
    
   ```

## Defining and Creating the database connection in database.js

We will make use of the ```createConnection()``` method from MySQL library to create a connection to the database.

To connect to the database, we will have to specify the **host IP(localhost)**, **Database User account name(root)**, **Database User account password(root)** and the **Database(userDatabase)** schema we are connecting to.
```javascript
// Create the following in the databaseConfig.js file

const mysql = require("mysql") // Loads the MySQL library

const dbConnect = {

    getConnection: () => {
        let conn = mysql.createConnection({
            host: 'localhost', 
            user: 'root', // Username of your mysql workbench
            password: 'root',// password of your mysql workbench
            database: 'userDatabase' // Database(Schema) name
        })

        return conn
    }
}
module.exports = dbConnect

```

As the database connection and its settings will be used frequently by different files and modules, we will define the code in the **model** folder.

## Restful APIs

| URL        | HTTP Method | POST Body   | Result                         |
| ---------- | ----------- | ----------- | ------------------------------ |
| /user      | GET         | empty       | Retrieve ALL user data         |
| /user/{id} | GET         | empty       | Retrieve user data with userID |
| /user      | POST        | JSON object | Insert new user record         |
| /user/{id} | PUT         | JSON object | Update existing user record    |
| /user/{id} | DELETE      | empty       | Delete user with ID            |



## Creating our main server in the root folder

   We will create a ```server.js``` file for the server to listen at **port 8081**

   ```js
    const app = require("./controller/app.js")

    let port = 8081

    const server = app.listen(port, () => {
        console.log("Server is running at Port: " + port)
    })

   ```
   An error might occur as the ```app.js``` file has not been created. (Don't worry and read on :D)

## Creating functions for Database Access
We will now proceed to design our database call to access the data in the database.

We will first be creating an asynchronous function called ```getUser()``` that will return a callback function once the data is returned from the database.

1. Create a file inside the model folder called ```user.js```
2. Add the following code into **user.js**
   ```js
    const db = require("./databaseConfig.js")

    let User = {
        getUser : (userID, callback) => {
            let conn  = db.getConnection()
            conn.connect((err) => {
                if (err){
                    console.log("Database Error!")
                    return callback(err, null)
                }
                else{
                    console.log("Database Connected!")
                    let QUERY = `SELECT * FROM Users WHERE userID = ?`
                    conn.query(QUERY, [userID], (err, result)=>{
                        conn.end()
                        if (err){
                            console.log("Query Error")
                            return callback(err, null)
                        }
                        else{
                            console.log("Query Success!")
                            return callback(null, result)
                        }
                    })
                }
            })
        }
    }
    module.exports = User

   ```
3. Defining the routes in the controller layer
   
   At the controller layer, we will create a new router called ```app.js``` to define the application routing.

   ```js
    const express = require("express")
    const User = require("../model/user.js")

    const app = express()

    // API Endpoints

    app.get('/api/user/:userID', (req, res) => {
        let userID = req.params.userID

        User.getUser(userID, (err, result) => {
            if (!err){
                res.status(200).send(result)
            }
            else{
                res.status(500).send("Internal Server Error")
            }
        })
    })
    module.exports = app
   ```

4. Test out our server
   
   We will now test out the server. Open up the integrated terminal in your VScode and key in the following ```node server.js```

   Open your Browser and input ```localhost:8081/api/user/1``` into the address bar and you should see the JSON object appear.

   ![Test Server](https://github.com/AngKS/BED-Workshop/blob/main/assets/test01.png?raw=true)

### Nice! Our Server is Up and ready for more endpoints!

## GET Request - All users from database

We will now be creating a new function to GET all users from the database.

```js
// Insert the code after yout getUser function in user.js
const db = require("./databaseConfig.js")

    let User = {
        getUser : (userID, callback) => {
            /* previous endpoint code */
        },

        getAllUser : (callback) => {
            let conn  = db.getConnection()
            conn.connect((err) => {
                if (err){
                    console.log("Database Error!")
                    return callback(err, null)
                }
                else{
                    console.log("Database Connected!")
                    let QUERY = `SELECT * FROM Users`
                    conn.query(QUERY, (err, result)=>{
                        conn.end()
                        if (err){
                            console.log("Query Error")
                            return callback(err, null)
                        }
                        else{
                            console.log("Query Success!")
                            return callback(null, result)
                        }
                    })
                }
            })
        }
    }
    module.exports = User

```
We created a new function called ```getAllUser()``` after the previous function for our controller to query the database.

### Add the API endpoint
Next, we will have to add another API endpoint inside ```app.js``` to receive and route the request.

```js

// Endpoint to get ALL users
app.get('/api/users', (req, res) => {
    
    User.getAllUser((err, result) => {
        if (!err){
            res.status(200).send(result)
        }
        else{
            res.status(500).send("Internal Server Error")
        }
    })
})

```

### Endpoint testing time!
![test 02](https://github.com/AngKS/BED-Workshop/blob/main/assets/test02.png?raw=true)

## POST Request - Add a new User into the database

To handle the HTTP POST Request, we need to use a middleware to extract the entire body portion of the incoming request stream.


1. Add Express bodyparser.

    ```js
        app.use(express.json()) // used to parse JSON objects
        app.use(express.urlencoded()) // used to parse URL-encoded bodies
    ```
    The 2 lines above are the built-in bodyParser for parsing JSON objects and url-encoded contents of the incoming request. Insert it right before the first API endpoint as follows:
    ```js
    const express = require("express")
    const User = require("../model/user.js")

    const app = express()

    app.use(express.json()) 
    app.use(express.urlencoded()) 

    // API Endpoints
    app.get('/api/user/:userID', (req, res) => {
        /* endpoint codes */
    })
    app.get('/api/user/:userID', (req, res) => {
        /* endpoint codes */
    })
    module.exports = app

    ```
2. Create a new function to INSERT a new user into the database

    ```js
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
    }

    ```
    Insert the code above right after the previous ```getAllUser()``` function for our controller to query the database.

    ### Add the API Endpoint

    We will now add the POST endpoint inside ```app.js``` to receive and route the request to insert the new user into the database.

    ```js
    app.post('/api/user', (req, res) => {
        let username = req.body.username
        let email = req.body.email
        let course = req.body.course
        let age = req.body.age
        let password = req.body.password

        User.addUser(username, email, course, age, password, (err, result) => {
            if (!err){
                console.log(result)
                res.status(200).send(result + ' records inserted!')
            }
            else{
                res.status(err.statusCode).send("Server Error!")
            }
        })
    })
    ```

### Endpoint testing time!
![test 03](https://github.com/AngKS/BED-Workshop/blob/main/assets/test03.png?raw=true)

## PUT Request - Update the particulars of an existing User in the database.

This is where things get a little spcy; we are going to create a new function to UPDATE the **email and password** of an existing record in the database.

```js



```


