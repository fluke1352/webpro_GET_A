const express = require("express");
const pool = require("../config");
const { generateToken } = require("../utils/token");
const Joi = require('joi')
router = express.Router();
const bcrypt = require('bcrypt');
const { loginAuth } = require('../middlewares')

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})
router.get('/user/me', loginAuth, async (req, res, next) => {
        res.json(req.user)
})

router.post("/auth", async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const username = req.body.username;
    const password = req.body.password;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        console.log(username);
        const [users] = await conn.query(
            'SELECT * FROM account WHERE user_username=?', 
            [username]
        )
        const user = users[0]

        
        if (!user) {    
             throw new Error('Incorrect username or password')
         }
         if (!(await bcrypt.compare(password, user.user_password))) {
           throw new Error('Incorrect username or password')
        }
        const [tokens] = await conn.query(
             'SELECT * FROM tokens WHERE user_id=?', 
             [user.user_user_id]
         )
         let token = tokens[0]?.token
         console.log(token);
         if (!token) {
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(user_id, token) VALUES (?, ?)', 
                [user.user_user_id, token]
            )
        }
        conn.commit()
        res.status(200).json({'token': token})
    } catch (error) {
        conn.rollback()
        console.log(error);
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }

})



exports.router = router;