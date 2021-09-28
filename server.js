// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const sass       = require("node-sass-middleware");
const fileUpload = require('express-fileupload');
const morgan     = require('morgan');
const app        = express();

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
app.use(cookieParser());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : '/tmp/',
  uploadTimeout : 3000
}));



app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const login =require('./routes/login');
const adminRoutes = require("./routes/admin");
const apiRoutes = require("./routes/api");
const favouriteRoute = require("./routes/favourites");
const messagesRoute = require("./routes/messages");
app.disable('etag');// removing the url from the cache memory
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/login", login());
app.use("/admin", adminRoutes(db));
app.use("/favourites", favouriteRoute(db));
app.use("/messages", messagesRoute(db));
app.use("/api", apiRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const user_id = req.cookies.user_id;
  let isAdmin = false;
  if(user_id && user_id === '1'){
    isAdmin = true;
  }
  res.render("index",{'isAdmin':isAdmin});
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
