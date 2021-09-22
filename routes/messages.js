/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
  //   let queryStr = `SELECT * FROM trades`;
  //   console.log(queryStr);
  //   db.query(queryStr)
  //     .then(data => {
  //       const trades = data.rows;
  //       res.json({ trades });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
    console.log("----->Messages@@@");
    res.render('messages.ejs');
  });
  return router;
};
