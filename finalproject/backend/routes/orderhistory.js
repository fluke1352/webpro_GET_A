const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

router.post("/orderhistory", async (req, res, next) => {
    console.log('start!!!!!');
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        // let [info, _] = await conn.query(
        //     "SELECT * FROM 999auto.order;"
        // );

        let [info, _] = await conn.query(
            "select o.order_date, o.delivery_date, p.product_name, oi.item_amount, oi.item_price, oi.total_price from 999auto.order o join order_item oi on(o.order_id = oi.order_order_id) join product p on(oi.product_product_id = p.product_id) where o.user_user_id = ? ;",[1]
            // "select * from 999auto.order o join 999auto.order_item oi on(o.order_id = oi.order_order_id) join 999auto.product p on(oi.product_product_id = p.product_id) join 999auto.user u on(o.user_user_id = u.user_id) join 999auto.account a on(o.user_user_id = a.user_id) where o.user_user_id = ? ;",[1]
            );


        res.json({
            message: info
        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

exports.router = router;

