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

router.post("/login", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {

            let [login, _] = await conn.query('SELECT * FROM account WHERE user_username = ? AND user_password = ?', [username, password]);

            if (login.length > 0) {
                console.log("login success");
                res.json({
                    message: "login success"
                });
            }

            else {
                res.json({
                    message: "wrong username or password"
                });
            }
        } else {
            res.json({
                message: "please input username or password"
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