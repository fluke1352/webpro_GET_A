const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const { loginAuth } = require('../middlewares')
router = express.Router();

const { uploadFile, getFileStream } = require('./s3bucket')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

router.post("/addproduct", upload.array("myImage", 6), loginAuth, async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    if (req.method == "POST") {
        const file = req.files[0];
        const owner = req.user.user_username
        const productname = req.body.name;
        const productcategory = req.body.category;
        const producttype = req.body.type;
        const productbrand = req.body.brand;
        const productprice = req.body.price;
        const productamount = req.body.amount;
        const productdescription = req.body.description;
        let pathArray = [];
        await uploadFile(file)


        try {
            let [check, c] = await conn.query(
                "select * from product where ? = product_name AND ? =  category",
                [productname, productcategory]
            );
            let [check2, z] = await conn.query(
                "select * from product_type where ? = type_name AND ? = brand",
                [producttype, productbrand]
            );

            if (check.length > 0 && check2.length > 0) {
                console.log("already add");
                res.json({ message: "Already add" })
                // let [a, b] = await conn.query('SELECT product_type.amount_product FROM product_type  WHERE product_product_id=?', [check[0].product_id])
                // await conn.query("UPDATE product_type SET amount_product=? WHERE product_product_id=?",[a[0].amount_product+parseInt(productamount), check[0].product_id])
            } else {
                await conn.query(
                    "INSERT INTO product(product_name, category, storge_date) VALUES (?,?,1);",
                    [productname, productcategory]
                );
                console.log("add complete");
                let [data, _] = await conn.query(
                    "select * from product;",
                );
                let id = data[data.length - 1].product_id

                let a = [];
                // req.files.forEach((file, index) => {
                //     let path = [producttype, productdescription,productprice, productamount,productbrand,id ,file.path.substring(6)];
                //     pathArray.push(path);
                // });
                req.files.forEach((file, index) => {
                    let path = [file.path.substring(6)];
                    pathArray.push(path);
                });
                pathArray = "[" + pathArray + "]"
                let path = [[producttype, productdescription, productprice, productamount, productbrand, id, pathArray]];
                console.log(path);

                await conn.query(
                    "INSERT INTO product_inflow(inflow_amount, inflow_price, product_product_id,inflow_date) VALUES (?,?,?,CURRENT_TIMESTAMP);",
                    [productamount, productprice, id]
                );
                
                let [row, b] = await conn.query(
                    "select owner_id from owner where owner_username = ?",
                    [owner]
                );
                // console.log(owner + " " + );

                await conn.query(
                    "INSERT INTO product_owner(product_product_id,owner_owner_id,date) VALUES (?,?,CURRENT_TIMESTAMP);",
                    [id, row[0].owner_id]
                );

                // console.log(pathArray);

                await conn.query(
                    "INSERT INTO product_type(type_name, other_spec , price, amount_product,brand,product_product_id,image) VALUES ?;",
                    [path]
                );

                await conn.query(
                    "INSERT INTO product_storge_date(product_product_id, storge_date) VALUES (?, CURRENT_TIMESTAMP);",
                    [id]
                );
            }
            res.json({ message: "Add complete" })
            conn.commit();
            conn.release();
        }
        catch (error) {
            // console.error(error);
            next(error);
        }
    }

})
exports.router = router;