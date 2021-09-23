const express = require('express');
const router  = express.Router();


module.exports = () => {
  router.get("/", (req, res) => {
    res.cookie('user_id', req.params.id);
    res.render('contact.ejs');
    console.log("reached login route.");
  });
  return router;
};
