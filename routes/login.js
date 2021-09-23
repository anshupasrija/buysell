const express = require('express');
const router  = express.Router();


module.exports = () => {
  router.get("/", (req, res) => {
    res.cookie('user_id', req.params.id);
    res.render('login.ejs');
    console.log("reached login route.");
  });
  return router;
};

function generateRandomString(len, arr) {
  const result = Math.random().toString(36).slice(2);
  return result.substring(0, 6);
}
/*
app.get("/login", (req, res) => {
  if(req.session["user_id"]) {
    res.redirect("/messages");
  }
});

app.post("/login", (req, res) => {
  const theName = req.body.fname;
  const theEmail = req.body.nameemail;
  const thePass = req.body.psw;
  const hashedPassword = bcrypt.hashSync(thePass, 10);
  const newUserId = generateRandomString();
  if(!theEmail || !thePass) {
    res.status(400).send('Please, enter a proper email or a password!');
  };
  req.session.user_id = newUserId;
  res.redirect("/messages");
});
*/