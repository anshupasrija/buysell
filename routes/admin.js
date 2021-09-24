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
    // let query = `SELECT * FROM widgets`;
    // console.log(query);
    // db.query(query)
    //   .then(data => {
    //     const widgets = data.rows;
    //     res.json({ widgets });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    console.log(req.cookies.user_id);
    if(req.cookies.user_id === "1") {
      res.render('admin.ejs');
    }else{
      res.redirect("/");
    }
  });


//   id SERIAL PRIMARY KEY NOT NULL,
// --  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
// --  car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,

// --  title VARCHAR(255) NOT NULL,
// --  trade_type VARCHAR(10) NOT NULL,
//   sold BOOLEAN NOT NULL DEFAULT FALSE,
//   sold_user_id INTEGER,

//   brand VARCHAR(128) NOT NULL,
//   model VARCHAR(255) NOT NULL,
//   year SMALLINT NOT NULL,
//   color VARCHAR(20),
//   transmission VARCHAR(20),
//   fuel VARCHAR(20),
//   mileage INTEGER,
//   thumbnail_photo_url VARCHAR(255),
//   image VARCHAR(255),

//   price INTEGER,
//   description TEXT,
//   start_at TIMESTAMP NOT NULL  DEFAULT now(), --start_at may not now().
//   end_at  TIMESTAMP,
//   insert_date TIMESTAMP NOT NULL  DEFAULT now(),
//   -- country VARCHAR(255),
//   -- street VARCHAR(255),
//   -- city VARCHAR(255),
//   -- province VARCHAR(255),
//   -- post_code VARCHAR(255),
//   -- tag VARCHAR(255),
//   active BOOLEAN NOT NULL DEFAULT TRUE


  router.post("/", (req, res) => {

    console.log("req.body.brand--->", req.body.listOfCars);
    console.log("req.body.model--->", req.body.name);
    console.log("req.body.img--->", req.body.img);
    console.log("req.body.year--->", req.body.year);
    console.log("req.body.price--->", req.body.price);
    console.log("req.body.sold--->", req.body.sold);
    console.log("req.body.color--->", req.body.color);
    console.log("req.body.mileage--->", req.body.mileage);
    console.log("req.body.transmission--->", req.body.transmission);
    console.log("req.body.fuelType--->", req.body.fuelType);
    console.log(req.body);
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

    // res.render('admin.ejs');
    // console.log("reached admin route.");
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

