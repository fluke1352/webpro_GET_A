const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

const multer = require("multer");

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

router.post("/register", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const user_fname = req.body.firstName;
    const user_lname = req.body.lastName;
    const user_phone = req.body.phoneNumber;
    const user_userName = req.body.userName;
    const user_password = req.body.password;

    try {
        let [info, _] = await conn.query(
            "select user_fname, user_phone from user where ? = user_fname AND ? =  user_phone;",
            [user_fname, user_phone]
        );

        if (info.length == 0) {

            let [rows, _] = await conn.query(
                "INSERT INTO user(user_fname, user_lname, user_phone) VALUES(?,?,?);",
                [user_fname, user_lname, user_phone]
            );

            let [data, a] = await conn.query(
                "select * from user where ? = user_fname AND ? =  user_phone AND ? = user_lname;",
                [user_fname, user_phone, user_lname]
            );
                console.log(data[0].id);
            if (data.length > 0) {
                await conn.query(
                    "INSERT INTO account(user_username, user_password, user_user_id) VALUES(?,?,?);",
                    [user_userName, user_password, data[0].user_id]
                );

                res.json({
                    message: "Add Complete"
                });
            }
            else{
                res.json({
                    message: "Cann't Add"
                });
            }
        }

        else {
            res.json({
                message: "this account has been registered"
            });
        }

        conn.commit();
        conn.release();

    } catch (error) {
        // console.error(error);
        next(error);
    }
    
})


exports.router = router;