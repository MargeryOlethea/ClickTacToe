let bcrypt = require("bcryptjs");

let hashPassword = (password) => bcrypt.hashSync(password);
let comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
module.exports = { hashPassword, comparePassword };
