const { User } = require('../models')
const { comparePassword } = require('../utils/hash')
const { createToken } = require('../utils/token')

class Controller {

  static async register(req, res, next) {
    try {
      const { username, password, totalWin, totalPlay } = req.body
      const user = await User.create({ username, password, totalWin, totalPlay})
      

      res.status(201).json({
        message: "Success create new user"
      })
    } catch (error) {
      next(error)
    }
  }
  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        throw { name: "LoginInputError" }
      }
      
      const foundUser = await User.findOne({
        where: {username}
      })

      console.log(foundUser);
      if (!foundUser || !password) {
        throw { name: "InvalidCredential" }
      }

      const correctUser = comparePassword(password, foundUser.password)

      if (!correctUser) {
        throw { name: "InvalidCredential" }
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username
      }

    const token = createToken(payload)
    
    res.status(200).json({access_token: token, username: foundUser.username})

    } catch (error) {
      next(error)
    }
  }

}
module.exports = Controller;
