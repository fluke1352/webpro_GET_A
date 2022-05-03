const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();


router.get("/allproduct", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {

        [info, _] = await conn.query(
            "select *"+
            " from product p join product_type pt on(p.product_id = pt.product_product_id)"+
            " order by (price)"
        );
        // console.log(info);
        res.json({ message: info })
        conn.commit();
        conn.release();
    }
    catch (error) {
        // console.error(error);
        next(error);
    }

})

router.post("/showproduct/:category", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    let category = req.params.category
    // console.log(category);
    try {

        [info, _] = await conn.query(
            "select *"+
            " from product p join product_type pt on(p.product_id = pt.product_product_id)"+
            " where category = ? order by (price)",[category]
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

router.post("/seaechproduct", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const search = req.body.search
    const minrange = parseInt(req.body.minrange)
    const maxrange = parseInt(req.body.maxrange)

    try {
        if (!search) {
            [info, _] = await conn.query(
                "select * from product p join product_type pt on(p.product_id = pt.product_product_id) where (price) >= ? AND (price) <= ? order by (price)"
                , [minrange, maxrange]
            );
        }
        else {
            [info, _] = await conn.query(
                "select * from product p join product_type pt on(p.product_id = pt.product_product_id) where (product_name like ? or category like ? or brand like ?) AND ((price) >= ? AND (price) <= ?) order by (price)"
                , ['%' + search + '%', '%' + search + '%', '%' + search + '%', minrange, maxrange]
            );
        }


        res.json({ message: info })
        conn.commit();
        conn.release();
    }
    catch (error) {
        // console.error(error);
        next(error);
    }

})

router.post("/seaechproductincategory", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const search = req.body.search
    const minrange = parseInt(req.body.minrange)
    const maxrange = parseInt(req.body.maxrange)
    const category = req.body.category
    try {
        if (!search) {
            [info, _] = await conn.query(
                "select * from product p join product_type pt on(p.product_id = pt.product_product_id) where category = ? AND (price) >= ? AND (price) <= ? order by (price)"
                , [category , minrange, maxrange]
            );
        }
        else {
            [info, _] = await conn.query(
                "select * from product p join product_type pt on(p.product_id = pt.product_product_id) where category = ? AND (product_name like ? or category like ? or brand like ?) AND ((price) >= ? AND (price) <= ?) order by (price)"
                , [category , '%' + search + '%', '%' + search + '%', '%' + search + '%', minrange, maxrange]
            );
        }


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