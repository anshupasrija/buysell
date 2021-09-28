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

    let imgfileName = null;

    if(req.files){

      const uploadedFile = req.files.img;
      imgfileName = uploadedFile.name;
      uploadedFile.mv('./public/images/itemImages/' + uploadedFile.name, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      });
   }

    const query = `INSERT INTO trades (brand, model, image, year, price, color, mileage, transmission, fuel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

    db.query(query, [req.body.listOfCars, req.body.model, imgfileName, req.body.year, req.body.price, req.body.color, req.body.mileage, req.body.transmission, req.body.fuelType])
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

    const trade_id = Object.keys(req.body)[0];
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

    const trade_id = Object.keys(req.body)[0];
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

