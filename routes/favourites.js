const express = require('express');
const router  = express.Router();




module.exports = (db) => {

  router.get("/:user_id", (req, res) => {
    console.log('we are here');
    const sqlQuery = `SELECT * FROM favourites JOIN trades ON  trades.id =favourites.trade_id WHERE favourites.user_id =$1;`
    const params = [req.params.user_id]
    db.query(sqlQuery,params)
    .then(data => {
      console.log('<<<<<<<<<<<<<<<<<>>>>>>>>>>', data.rows)
      return res.status(200).json(data.rows);
    })
  });

  // router.post("/", (req,res)=>{
  //   console.log(req.body);
  // })


  return router;
};



