//Packages
const express = require("express")

//modules
const path = require('path');

// App setup
const app = express();

// App routes setup
const homeRoutes = require('./routes/home.routes');


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// makes sure to include the public folder to the server (middleware)
app.use(express.static(path.join(__dirname, 'public')));


// Use the routes
app.use('/', homeRoutes); // mount all home routes at root "/"



// App Port setup
const PORT = process.env.PORT || 3000
//app to listen at "PORT"
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});