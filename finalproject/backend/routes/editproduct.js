const express = require("express");
const pool = require("../config");
router = express.Router();
const { loginAuth } = require('../middlewares')

const admin = async (req, res, next) => {
    if (req.user.user_status != 'owner') {
        console.log('You do not have permission to perform this action');
     return res.status(403).send('You do not have permission to perform this action')
    }
   next()
 }
router.get("/product", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
      let [info, _] = await conn.query(
          "select * from product_type t join product p on (p.product_id = t.product_product_id)"
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
router.post("/addamount",loginAuth,admin,async (req, res, next) => {
        const price = req.body.price;
        const amount = req.body.amount;
        const id = req.body.id;
        const change = req.body.amountchange;
        console.log(price);
        console.log(amount);
        console.log(id);
        console.log(change);
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query(
            "UPDATE product_type SET  amount_product=? WHERE product_product_id=?;", [amount, id+1]
        );
        await conn.query(
            "INSERT INTO product_inflow(inflow_amount, inflow_price, product_product_id ,inflow_date) VALUES (?,?,?,CURRENT_TIMESTAMP);",
            [change, price, id+1]
        );
        res.json({message:"update"})
        conn.commit();
        conn.release();
  
    } catch (error) {
        next(error)
        conn.rollback()
    }
  })
  router.post("/changeproduct",loginAuth,admin,async (req, res, next) => {
    const name = req.body.name;
        const category = req.body.category;
        const type = req.body.typename;
        const brand = req.body.brand;
        const price = req.body.price;
        const amount = req.body.amount;
        const id = req.body.id;
        const description = req.body.description;
        const change = req.body.amountchange;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query(
            "UPDATE product SET product_name = ?, category = ? WHERE product_id=?;", [name, category, id+1]
        );
        await conn.query(
            "UPDATE product_type SET type_name = ?, other_spec = ? , price=? ,brand=? WHERE product_product_id=?;", [type,description ,price,brand, id+1]
        );
        await conn.query(
            "UPDATE product_owner SET date=CURRENT_TIMESTAMP WHERE product_product_id=?;", [id+1]
        );
        await conn.query(
            "INSERT INTO product_inflow(inflow_amount, inflow_price, product_product_id ,inflow_date) VALUES (?,?,?,CURRENT_TIMESTAMP);",
            [change, price, id+1]
        );
        res.json({message:"update"})
        conn.commit();
        conn.release();
  
    } catch (error) {
        next(error)
    }
  })

exports.router = router;
