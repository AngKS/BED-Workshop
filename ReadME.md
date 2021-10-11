# S.E.E.D Back-End Web Development Workshop

In this workshop, we will be understand how to implement and combine data persistence and a simple web service to develop a simple application backend service.

### [Powerpoint Slides](https://docs.google.com/presentation/d/18_1yieS9Ya9JO49QSkv2flmngZD3-s4gRMsGNwQC-NQ/edit?usp=sharing "Presentation Slides")

## Topics covered
* Setting up Persistent Storage Source using MySQL
* What is MVC
* Defining & Creating database Connection
* Creating functions for database access
* Defining the routing in the controller layer
* Creating main server in the root folder
* Querying the Database
* Creating **GET** Method for retrieving User data
* Creating **POST** Method for inserting and retrieving User data
* Creating **DELETE** method for deleting User data
* Creating **UPDATE** Method to update User data

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

| URL | HTTP Method | POST Body | Result |
|-----|-------------|-----------|--------|
 /user | GET | empty | Retrieve ALL user data|
 /user/{id} | GET | empty | Retrieve user data with userID |
 /user | POST | JSON object | Insert new user record |
 /user/{id} | PUT | JSON object | Update existing user record |
 /user/{id} | DELETE | empty | Delete user with ID


we will be designing our web service based on the Model-View-Controller (MVC) Design with the above API endpoints.

## What is MVC?
**MVC** is a simple architecture where all components are seperated into 3 classes:
* ### Model
* ### View
* ### Controller