const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const Joi = require('joi')
router = express.Router();
const bcrypt = require('bcrypt');

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
const passwordcheck = (value, helpers) =>{
    if (value.length < 6) {
        throw new Joi.ValidationError('Password must contain at least 6 characters')
    }if (!(value.match(/[a-z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
        return value
}
const usernamecheck = async (value, helpers) => {
    const [rows, _] = await pool.query("select user_username from account where user_username = ?", [value])
    if (rows.length > 0) {
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}
const registercheck = Joi.object({
    firstName: Joi.string().required().max(100),
    lastName: Joi.string().required().max(100),
    phoneNumber: Joi.string().required().pattern(/0[0-9]{9}/),
    userName: Joi.string().required().min(5).max(20).external(usernamecheck),
    password: Joi.string().required().custom(passwordcheck),
   })

router.post("/register", upload.array("myImage", 1), async (req, res, next) => {
    try{
        registercheck.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
    res.status(400).json(err)
    }
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    if (req.method == "POST") {
        const file = req.files;
        const user_fname = req.body.firstName;
        const user_lname = req.body.lastName;
        const user_phone = req.body.phoneNumber;
        const user_userName = req.body.userName;
        const user_password = await bcrypt.hash(req.body.password, 5);
        let pathArray = [];



        try {
            let [info, _] = await conn.query(
                "select user_fname, user_phone from user where ? = user_fname AND ? =  user_phone;",
                [user_fname, user_phone]
            );
            req.files.forEach((file, index) => {
                let path = [user_fname, user_lname, user_phone, file.path.substring(6)];
                pathArray.push(path);
            });
            if (info.length == 0) {

                let [rows, _] = await conn.query(
                    "INSERT INTO user(user_fname, user_lname, user_phone, user_image) VALUES ?;",
                    [pathArray]
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
                else {
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
    }

})

router.post("/editaccount", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    id = req.body.id
    // console.log(id);
    try {
        let [info, _] = await conn.query(
            "select u.user_fname, u.user_lname, u.user_image, u.user_phone, a.user_username, a.user_password from user u, account a where ? = u.user_id AND ? =  a.user_user_id",
            [id, id]
        );
        // console.log(info[0]);
        res.json({
            message: info[0]
        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

router.put("/editaccount", upload.array("myImage", 1), async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    id = req.body.id
    const file = req.files;
    username = req.body.username
    password = req.body.pass
    let pathArray = [];
    // console.log(file);


    try {
        if (file.length === 0) {
            console.log("not file");
            let [info, _] = await conn.query(
                "UPDATE account SET user_username = ?, user_password = ? WHERE user_user_id=?;", [username, password, id]
            );
        }
        else {
            console.log("have file")
            req.files.forEach((file, index) => {
                let path = [file.path.substring(6)];
                pathArray.push(path);
            });

            let [info, _] = await conn.query(
                "UPDATE account SET user_username = ?, user_password = ? WHERE user_user_id=?;", [username, password, id]
            );
            await conn.query(
                "UPDATE user SET user_image = ? WHERE user_id=?;", [pathArray, id]
            );
           
            // console.log(info[0]);
            
        }

        res.json({
            message: 'UPDATE complete'
        });
        conn.commit();
        conn.release();

    } catch (error) {
        next(error)
    }
})

exports.router = router;