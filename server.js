//pull in node express package
const express = require("express")

//variable app calls the express function, which makes an instance of an Express application
const app = express()

//set ejs framework to allow dynamic html pages
app.set("view engine", "ejs")

//get request from root (/) to make a callback function whenever someone uses a get request
app.get("/", (req, res) => {
    //the server sends "working" after client sends get request
 res.send("working")

    //the server renders the hompage view after client sends get request
 res.render("homepage")
})

//set port Number and includes environment through 'process.env' to "PORT" variable
const PORT = process.env.PORT || 3000 

//app to listen at "PORT"
app.listen(PORT)