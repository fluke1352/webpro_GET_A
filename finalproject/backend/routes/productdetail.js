const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();

router.post("/productdetial/:id", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const id = req.params.id
    console.log(id);
    try {

        [info, _] = await conn.query(
            "select * from product p join product_type pt on(p.product_id = pt.product_product_id) where product_id = ?", [id]
        );

        res.json({ message: info })
        conn.commit();
        conn.release();
    }
    catch (error) {
        // console.error(error);
        next(error);
    }

})



exports.router = router;