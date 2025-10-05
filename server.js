//pull in node express package
const express = require("express")

//variable app calls the express function, which makes an instance of an Express application
const app = express()
//set port Number and includes environment through 'process.env' to "PORT" variable
const PORT = process.env.PORT || 3000;

//set ejs framework to allow dynamic html pages
app.set("view engine", "ejs")
//makes sure to include the public folder to the server
app.use(express.static("public"))


//get request from root (/) to make a callback function whenever someone uses a get request
app.get("/", (req, res) => {
    //the server renders the hompage view after client sends get request
 res.render("homepage")
})



//app to listen at "PORT"
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});