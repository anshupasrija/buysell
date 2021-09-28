const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('we are here');
    const sqlQuery = `SELECT * FROM favourites JOIN trades ON  trades.id =favourites.trade_id WHERE favourites.user_id =$1 and trades.active=true;`
    const params = [req.cookies.user_id]
    console.log("this is params", params);
    db.query(sqlQuery,params)
    .then(data => {

      return res.status(200).json(data.rows);
    })
  });

  router.post("/", (req, res) => {
    // console.log("this is req body",req.body);
    const trade_id = Object.keys(req.body)[0];
    const user_id = req.cookies.user_id;
    console.log("ItemID: ", trade_id)
    console.log("userID: ", user_id)

    const preFavSql = `SELECT 1 FROM favourites WHERE user_id = $1 AND trade_id = $2;` ;

    db.query(preFavSql, [user_id, trade_id])
    .then(data => {
      // console.log(data);
      if (data.rowCount > 0) {
        const sql = `DELETE FROM favourites WHERE user_id = $1 AND trade_id = $2 RETURNING *;`
        db.query(sql, [user_id, trade_id])
      } else {
        const sql = `INSERT INTO favourites (user_id, trade_id) VALUES ($1, $2) RETURNING *;`
        db.query(sql, [user_id, trade_id])
      }
    })
    .then(data => {
      // const user_id = req.cookies.user_id;
      let param = [];
      let query=`SELECT * FROM trades where active = true ORDER BY id DESC`;

      if(user_id) {
        query = 'SELECT trades.*, fav.id as heartred FROM trades LEFT JOIN (select * from favourites where user_id= $1) fav ON trades.id = fav.trade_id where active = true order by trades.id desc';
        param.push(user_id);
      }

      db.query(query, param)
        .then(data => {
          const trades = data.rows;
          res.json(trades);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: err.message });
    });

    // const sql = `INSERT INTO favourites (user_id, trade_id) VALUES ($1, $2) RETURNING *;`
    // db.query(sql, [user_id, trade_id])
    // .then(data => {
    //   res.json(data.rows);
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // });
  });


  return router;
};



