const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

router.post("/usercart", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const cart = req.body.cart

    let allProduct = new Array()
    let index = 0
    try {
        if (cart.length > 0) {
            cart.forEach(async (product) => {

                let [this_product, _] = await conn.query(
                    "select * from product p join product_type pt on(p.product_id = pt.product_product_id) where product_id = ?", [parseInt(product.id)]
                );
                console.log(this_product);
                index++
                allProduct.push(this_product[0])

                if (index === cart.length) {

                    res.json({
                        message: allProduct
                    });
                }
            })
        }
        else {
            res.json({
                message: []
            });
        }
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

exports.router = router