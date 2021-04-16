const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

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
const upload = multer({ storage: storage });


router.post("/addproduct", upload.array("myImage", 1), async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    if (req.method == "POST") {
        const file = req.files;

        const productname = req.body.name;
        const productcategory = req.body.category;
        const producttype = req.body.type;
        const productbrand = req.body.brand;
        const productprice = req.body.price;
        const productamount = req.body.amount;
        const productdescription = req.body.description;
        let pathArray = [];



        try {
            let [check, c] = await conn.query(
                "select * from product where ? = product_name AND ? =  category",
                [productname, productcategory]
            );
            let [check2, z] = await conn.query(
                "select * from product_type where ? = type_name AND ? = brand",
                [producttype, productbrand]
            );

            if(check.length > 0 && check2.length > 0){
                let [a, b] = await conn.query('SELECT product_type.amount_product FROM product_type  WHERE product_product_id=?', [check[0].product_id])
                await conn.query("UPDATE product_type SET amount_product=? WHERE product_product_id=?",[a[0].amount_product+parseInt(productamount), check[0].product_id])
            }else{

            let [data, a] = await conn.query(
                "select * from product;",
            );
            let id = data[data.length-1].product_id+1

            req.files.forEach((file, index) => {
                let path = [producttype, productdescription,productprice, productamount,productbrand,id ,file.path.substring(6)];
                pathArray.push(path);
            });

            await conn.query(
                "INSERT INTO product(product_name, category, storge_date) VALUES (?,?,CURRENT_TIMESTAMP);",
                [productname, productcategory]
            );
            
            await conn.query(
                "INSERT INTO product_type(type_name, other_spec , price, amount_product,brand,product_product_id,image) VALUES ?;",
                [pathArray]
            );
        }
            res.json({message: "Add complete"})
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