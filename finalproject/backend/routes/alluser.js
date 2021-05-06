const express = require("express");
const pool = require("../config");

router = express.Router();
router.post("/alluser", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [isUser, __] = await conn.query(
            "SELECT a.user_username, u.user_fname, u.user_lname, u.user_phone, u.user_image" +
            " FROM user u join account a on(u.user_id = a.user_user_id);"
        );
        res.json({
            message: isUser

        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

exports.router = router;

