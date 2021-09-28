const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/trades", (req, res) => {
    const user_id = req.cookies.user_id;
    let param = [];
    let query=`SELECT * FROM trades where active = true ORDER BY id DESC`; //Temporary qry, active, sold and sold_date check is needed

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
  });

  router.get("/search", (req, res) => {
    console.log("SEARCH BODY", req.query)

    let priceCondition = '';
    let brandCondition = '';
    let params = [];
    let orderBy = '';

    if (req.query.price) {

      orderBy += 'price, '

      switch (req.query.price) {
        case '0':
          priceCondition = `AND price between 0 and 5000`;
          break;
        case '5000':
          priceCondition = `AND price between 5000 and 10000`;
          break;
        case '10000':
          priceCondition = `AND price between 10000 and 30000`;
          break;
        case '30000':
          priceCondition = `AND price between 30000 and 50000`;
          break;
        case '50000':
          priceCondition = `AND price >= 50000`;
          break;
        default:
          break;
      }
    }

    if (req.query.brand) {
      orderBy += 'brand, '
      brandCondition = `AND LOWER(brand) LIKE $1`;
      params.push(`%${req.query.brand.toLowerCase()}%`);
    }

    const sql = `SELECT * FROM trades WHERE active = true ${priceCondition} ${brandCondition} ORDER BY ${orderBy} insert_date DESC`;

    db.query(sql, params)
    .then(data => {
       res.json(data.rows);
    })
  });

  return router;
};
