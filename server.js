//pull in node express package
const express = require("express")

//variable app calls the express function, which makes an instance of an Express application
const app = express()

//get request from root (/) to make a callback function whenever someone uses a get request
app.get("/", (req, res) => {
    //the server sends "working" after client sends get request
 res.send("working")
})

//app to listen at port 3000
app.listen(3000)