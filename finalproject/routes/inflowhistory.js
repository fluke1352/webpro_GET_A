const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

router.post("/inflowhistory", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [info, _] = await conn.query(
            "select o.owner_username, pin.inflow_amount, pin.inflow_price, pin.inflow_date, p.product_name from owner o, product_inflow pin, product p, product_owner po where po.owner_owner_id = o.owner_id AND po.product_product_id = pin.product_product_id AND po.product_product_id = p.product_id"
        );
        // console.log(info[0]);
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