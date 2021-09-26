const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
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

  // router= post

  return router;
};
