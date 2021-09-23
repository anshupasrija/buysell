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

  // router.post("/:trade_id", (req,res)=>{
    // insert
  //   console.log(req.body);
  // })


  return router;
};



