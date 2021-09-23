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

    //  console.log("req-------------->>>>>>>>>>>>>>>>>>>", req.query);


    // req.session.user_id = id;
//    const templateVars = { trade_id: req.query.trade_id, user_id: req.query.user_id };
    const templateVars = { trade_id: req.query.trade_id, user_id: '2'};
    res.render('messages.ejs', templateVars);
  });
  router.get("/:id", (req, res) => {
    //res.send(req.params.id);
  })
  return router;
};
