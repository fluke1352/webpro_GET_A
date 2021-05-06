const express = require("express");
const path = require("path");
const pool = require("../config");

const { loginAuth } = require('../middlewares')
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

// router.post("/orderhistory", async (req, res, next) => {
router.post("/orderhistory", loginAuth, async (req, res, next) => {
    // console.log('start!!!!!');
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {

        let [info, _] = await conn.query(
            "select o.order_date, o.delivery_date, p.product_name, oi.item_amount, oi.item_price, oi.total_price, o.user_user_id, o.order_id" +
            " from 999auto.order o join order_item oi on(o.order_id = oi.order_order_id)" +
            " join product p on(oi.product_product_id = p.product_id)" +
            " where o.user_user_id = ? ;", [req.user.user_id]
        );
        let [isUser, __] = await conn.query(
            "SELECT a.user_username, u.user_fname, u.user_lname, u.user_phone, u.user_image" +
            " FROM user u join account a on(u.user_id = a.user_user_id)" +
            " where u.user_id = ?;", [req.user.user_id]
        );
        console.log([info, _][0]);
        // console.log([isUser, _][0]);

        let arr_totalPrice = new Array()
        let ttp = 0
        const mySet_id = new Set()
        info.forEach((item, index) => {
            mySet_id.add(item.order_id)    
            console.log(item.order_id);
            if (index == 0) {
                ttp += item.total_price
            }
            else if (item.order_id != info[index - 1].order_id) {
                arr_totalPrice.push(ttp)
                ttp = 0
                ttp += item.total_price
            }
            else if (item.order_id == info[index - 1].order_id) {
                ttp += item.total_price
            }
            if (index == (info.length - 1)) {
                arr_totalPrice.push(ttp)
                ttp = 0
            }
        })
        let arr_id = Array.from(mySet_id);
        console.log(arr_totalPrice);
        console.log('arr_id');
        console.log(arr_id);

        const data = {
            orderDetail: info,
            userDetail: isUser,
            totalPrice: arr_totalPrice,
            ArrayId:arr_id
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

