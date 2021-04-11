const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async  (req, res, next) =>{
  try {
    const [rows, fields] = await pool.query(
      `SELECT * from product_type`
    );
    res.json(rows);
  } catch (err) {
    next(err)
  }
  
});

exports.router = router;
