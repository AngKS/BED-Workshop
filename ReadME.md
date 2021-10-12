# S.E.E.D Back-End Web Development Workshop

In this workshop, we will be understand how to implement and combine data persistence and a simple web service to develop a simple application backend service.

## [Powerpoint Slides](https://docs.google.com/presentation/d/18_1yieS9Ya9JO49QSkv2flmngZD3-s4gRMsGNwQC-NQ/edit?usp=sharing "Presentation Slides")

## Topics covered
* What is MVC
* Setting up Persistent Storage Source using MySQL
* Setting up the Project workspace
* Defining & Creating database Connection
* Creating functions for database access
* Defining the routing in the controller layer
* Creating main server in the root folder
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

## Restful APIs

| URL        | HTTP Method | POST Body   | Result                         |
| ---------- | ----------- | ----------- | ------------------------------ |
| /user      | GET         | empty       | Retrieve ALL user data         |
| /user/{id} | GET         | empty       | Retrieve user data with userID |
| /user      | POST        | JSON object | Insert new user record         |
| /user/{id} | PUT         | JSON object | Update existing user record    |
| /user/{id} | DELETE      | empty       | Delete user with ID            |



## Setting up the application directory and files

1. We will first create a folder called **myFirstWS**.
   
   ![Create myFirstWS folder](https://github.com/AngKS/BED-Workshop/blob/main/assets/projectfolder.png?raw=true)
2. Open the folder you just created in VScode; create another 2 folders: **controller** and **model**

![Create 2 sub-folders: controller & model](https://github.com/AngKS/BED-Workshop/blob/main/assets/modelAndController.png?raw=true)
3. Right-click on the explorer pane empty space or press <kbd>Ctrl</kbd> + <kbd>`</kbd> to open up the integrated terminal.
4. Run the following code in the integrated terminal to setup and install the necessary packages for your project.
   
    ```console
    npm init
    npm install mysql body-parser express
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
4. Creating our main server in the root folder
   We will create a ```server.js``` file for the server to listen at **port 8081**

   ```js
    const app = require("./controller/app.js")

    let port = 8081

    const server = app.listen(port, () => {
        console.log("Server is running at Port: " + port)
    })

   ```
5. Test out our server