const express = require("express");
const pool = require("../config");
const { loginAuth } = require('../middlewares')
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
                    "select *" +
                    " from product p join product_type pt on(p.product_id = pt.product_product_id)" +
                    " where product_id = ?", [parseInt(product.id)]
                );
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

router.post("/usercart/confirm", loginAuth, async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    console.log(req.user);
    if (req.method == "POST") {


        const products = req.body.products;
        const delivery_date = req.body.delivery_date;
        let price_of_all_item = 0;
        let amount_of_all_item = 0;
        const the_user_user_id = req.user.user_id;
        var d = new Date();
        var order_date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
        console.log(order_date);
        let a = []
        let arr_order_item = []

        products.forEach((item) => {
            amount_of_all_item += item.orderamount
            price_of_all_item += (item.orderamount * item.price)
        })


        let order = []
        order.push(delivery_date)
        order.push(price_of_all_item)
        order.push(amount_of_all_item)
        order.push(the_user_user_id)

        try {

            await conn.query(
                "INSERT INTO 999auto.order(delivery_date, order_date, price_of_all_item," +
                " amount_of_all_item, user_user_id) VALUES (?,?,?,?,?);",
                [delivery_date, order_date, price_of_all_item, amount_of_all_item, the_user_user_id]
            );

            //select order_id from order is same date and user
            let [order_id_selected, _] = await conn.query(
                "select order_id from 999auto.order where order_date = ?" +
                " and user_user_id = ?;", [order_date, the_user_user_id]
            );


            //arr of want to add 
            products.forEach((item) => {
                a.push(item.orderamount) //item[0]
                a.push(item.price)
                a.push(item.orderamount * item.price)
                a.push(order_id_selected[order_id_selected.length - 1].order_id)
                a.push(item.product_product_id) //item[4]
                arr_order_item.push(a)
                a = []
            })

            //add to order_item
            await conn.query(
                "INSERT INTO 999auto.order_item(item_amount, item_price, total_price" +
                ", order_order_id, product_product_id) VALUES ?;",
                [arr_order_item]
            );

            arr_order_item.forEach(async (item) => {
                await conn.query(
                    "update product_type" +
                    " set amount_product = amount_product - ?" +
                    " where product_product_id = ?;", [item[0], item[4]]
                );

            })
            console.log("INSERT complete");

            res.json({ message: "Confirm order :D" })
            conn.commit();
            conn.release();
        }
        catch (error) {
            conn.rollback();
            next(error);
        }
    }

})

exports.router = router