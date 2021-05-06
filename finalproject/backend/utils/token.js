function generateToken () {
    const result = [];
    const characters = '*/=-$#!@^&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 100; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
   }
   return result.join('');
}
// function adminToken () {
//     const result = [];
//       result.push("admin");
//    return result.join('');
// }

module.exports = {
    generateToken,
    // adminToken
}