const express = require('express');

const router  = express.Router();




module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log('we are here');
    const sqlQuery = `SELECT * FROM favourites JOIN trades ON  trades.id =favourites.trade_id WHERE favourites.user_id =$1;`
    const params = [req.cookies.user_id]
    console.log("this is params", params);
    db.query(sqlQuery,params)
    .then(data => {
      console.log('<<<<<<<<<<<<<<<<<>>>>>>>>>>', data.rows)
      return res.status(200).json(data.rows);
    })
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const trade_id = req.body.trade_id;
    const user_id = req.cookies.user_id;
    console.log("ItemID: ", trade_id)
    console.log("userID: ", user_id)
    const sql = `INSERT INTO favourites (user_id, trade_id) VALUES ($1, $2) RETURNING *;`
    db.query(sql, [user_id, trade_id])
    .then(data => {
      res.redirect("/")
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  return router;
};



