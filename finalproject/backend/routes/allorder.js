const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();


router.post("/allorder", async (req, res, next) => {
    // console.log('start!!!!!');
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        if (req.body.status) {
            let sordby = req.body.status
            console.log(sordby);
            let [info, _] = await conn.query(
                "select * from 999auto.order o join user u on(u.user_id = o.user_user_id) order by " + sordby
            );
            res.json({
                message: info
            });
        }
        else {
            let [info,] = await conn.query(
                "select * from 999auto.order o join user u on(u.user_id = o.user_user_id)"
            );
            res.json({
                message: info
            });
        }
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

router.post("/datailorder", async (req, res, next) => {
    // console.log('start!!!!!');
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [product, a] = await conn.query("SELECT * FROM 999auto.order_item join product on(product_product_id = product_id);")

        res.json({
            message: product

        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

exports.router = router;

