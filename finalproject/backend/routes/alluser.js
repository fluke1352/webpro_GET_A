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

router.post("/alluser", async (req, res, next) => {
    // console.log('start!!!!!');
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [isUser, __] = await conn.query(
            "SELECT u.user_status , a.user_username, u.user_fname, u.user_lname, u.user_phone, u.user_image, u.user_id" +
            " FROM user u join account a on(u.user_id = a.user_user_id);"
        );
        // console.log([isUser, __][0].length);
        // console.log([isUser, __][0]);

        // const data = {
        //     userDetail: isUser
        // }
        res.json({
            message: isUser

        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

router.put("/alluser", async (req, res, next) => {
    // console.log('start!!!!!');
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    let id = req.body.id
    console.log(id);

    try {
        await conn.query(
            "UPDATE user set user_status = 'owner' where user_id = ?;", [id]
        );
        let [row, a] = await conn.query(
            "select user_username, user_password from account where user_user_id = ?;", [id]
        );
        await conn.query(
            "insert into owner (owner_username, owner_password) VALUES (?, ?);", [row[0].user_username, row[0].user_password]
        );
        res.json({
            message: "Add complete"

        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

exports.router = router;

