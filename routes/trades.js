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
    const user_id = req.cookies.user_id;
    let param = [];
    let query=`SELECT * FROM trades where active = true order by id desc`; //Temporary qry, active, sold and sold_date check is needed

    // if(user_id) {
    //   query = 'SELECT trades.* FROM trades LEFT JOIN (select * from favourites where = $1) fav ON trades.id = fav.trade_id where active = true order by id desc';
    //   param.push(user_id);
    // }

    // db.query(query, param)
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
