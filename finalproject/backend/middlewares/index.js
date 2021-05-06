const pool = require("../config");
async function loginAuth(req, res, next) {
    let authorization = req.headers.authorization

    if (!authorization) {
        console.log("authorization");
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        console.log("bearer");
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        console.log("no token");
        return res.status(401).send('You are not logged in')
    }

    // Set user
    const [users] = await pool.query(
        'SELECT user_id, user_status,user_fname, user_lname, user_phone, user_image,user_username,user_password ' +
        'FROM user join account on(user.user_id = account.user_user_id) WHERE user_id = ?', [token.user_id]
    )
    req.user = users[0]

    next()
}

module.exports = {
    loginAuth
}