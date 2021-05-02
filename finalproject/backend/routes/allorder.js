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

router.post("/allorder", async (req, res, next) => {
    // console.log('start!!!!!');
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [info, _] = await conn.query(
            "select a.user_username, u.user_image, o.delivery_date, o.price_of_all_item, o.order_id"+
            " from account a join user u on(a.user_user_id = u.user_id) join order o on(u.user_id = o.user_user_id)"
        );
        let [order, __] = await conn.query(
            "select ot.order_order_id, ot.product_product_id, ot.item_amount, p.product_name from order_item ot join product p on(o.product_product_id = p.product_id)"
        );
        console.log([info, _][0].length);
        console.log([info, _][0]);
        console.log('*********************');
        console.log([order, __][0].length);
        console.log([order, __][0]);

        const data = {
            data1: info,
            data2: order
        }
        res.json({
            message: data

        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

exports.router = router;

