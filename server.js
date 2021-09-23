// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const contact =require('./routes/contact');
const widgetsRoutes = require("./routes/widgets");
const adminRoutes = require("./routes/admin");
const tradesRoutes = require("./routes/trades");
const searchRoute = require("./routes/search");
const favouriteRoute = require("./routes/favourites");
app.disable('etag');// removing the url from the cache memory
const messagesRoute = require("./routes/messages");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/contact", contact());
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/trades", tradesRoutes(db));
app.use("/admin", adminRoutes(db));
app.use("/search", searchRoute(db));
app.use("/favourites", favouriteRoute(db));
app.use("/messages", messagesRoute(db));
// app.use("/api/messages", messagesRoute(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
