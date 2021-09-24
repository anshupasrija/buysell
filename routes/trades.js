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
    let query = `SELECT * FROM trades WHERE active = true ORDER BY id`; //Temporary qry, active, sold and sold_date check is needed
    console.log(query);
    db.query(query)
      .then(data => {
        const trades = data.rows;
        res.json(trades);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// write search with if condition here like if
