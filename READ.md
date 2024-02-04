# Get Method
1. normal a routing showing the as per the data
2. find and get the perticular data using by id 
3. filter the data using query and get the data 


# Post Method

 * add data using post method check thirdparty plugin (thunderClient) 

# PUT Method
 
 * while we use put method with id for update the perticulare value , we have to add all field for change of one field

# PATCH Method

* This method we use update the data. there is not need to add all data for changing one data. jst method the 
id and which data want to change metion and submit , that particular data will be updated

# DElETE Method
 * Delete method use to delete the data using Id

# MiddleWare
 
 * middleware is very usefull to make a compact and compress the code . it make a middle things of all method .
 while using  middleware , it can't pass without (next()) syntax. it is very usefull for signin and signup procedure

# Validation

-  npm install express-validator

* validation can use to field set as a valid

# Routes

- routes make code split into small pieces and make code understand and easily

# cookies
 -  cokkies can use authentication like a token 

# session
 - session represent the duration of a usern  website by default HTTP is stateless. we don't know who making request to our server
 so we need to be able to track the req and know where they are comming from one common usage of session is to manage user authenticatoin session are created the server by generating an object with a session Id

 - npm i express-session

# passport js

- It can be used for (signin with google or facebook) like that way. passport take care mapping the user was logging in  with the session Id

    SerializeUser : it is used to get the user through the post method sharing email/user and password
    DeserializeUSer: get the userDetails through the Id ny the using of serializeuser

# DataBase 

- first install  npm i mongoose
    
    - connect with mongoDB
    - create schema and impleted through API in different Method
    -add session and cookies

# HashPassword
    
    npm i bcrypt
    To make a password to bcrypt password