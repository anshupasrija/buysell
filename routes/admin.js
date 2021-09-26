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
    console.log(req.cookies.user_id);
    if(req.cookies.user_id === "1") {
      res.render('admin.ejs');
    }else{
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {
    let query = `INSERT INTO trades (brand, model, image, year, price, color, mileage, transmission, fuel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

    db.query(query, [req.body.listOfCars, req.body.model, req.body.img, req.body.year, req.body.price, req.body.color, req.body.mileage, req.body.transmission, req.body.fuelType])
    .then((err, ress) => {
        res.redirect('/admin')
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

  });
  router.post("/delete", (req, res) => {

    console.log(req.body.id);
    console.log("this is req body",req);
    const trade_id = Object.keys(req.body)[0];
    console.log("ItemID: ", trade_id);
    const sql = `UPDATE trades SET active = false WHERE id = $1 RETURNING *;`
    db.query(sql, [trade_id])
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  router.post("/sold", (req, res) => {

    console.log(req.body.id);
    console.log("this is req body",req);
    const trade_id = Object.keys(req.body)[0];
    console.log("ItemID: ", trade_id);
    const sql = `UPDATE trades SET sold = NOT sold WHERE id = $1 RETURNING *;`
    db.query(sql, [trade_id])
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  return router;
};

