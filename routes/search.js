const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("SEARCH BODY", req.query)
    const sql = `SELECT * FROM trades WHERE brand LIKE $1 AND price = $2`;
    const params = [`%${req.query.brand}%`,req.query.price];
    db.query(sql, params)
    .then(data => {
      console.log('this is data',data);
      res.json(data.rows);
    })
  });
  return router;
};
