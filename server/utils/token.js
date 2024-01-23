require('dotenv').config()
const jwtoken = require('jsonwebtoken')
const secretKey = "apayabang"

function createToken(payload) {
  return jwtoken.sign(payload, secretKey)
}

function verifyToken(token) {
  return jwtoken.verify(token, secretKey)
}

module.exports= {createToken, verifyToken}