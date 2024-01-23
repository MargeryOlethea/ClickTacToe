const errorHandler = (error, req, res, next) => {
  console.log(error);
  let statusCode = 500;
  let message = "Internal server error";

  if (error.name === `SequelizeValidationError`) {
    statusCode = 400;
    message = error.errors[0].message;
  }
  if (error.name === `JsonWebTokenError`) {
    statusCode = 401;
    message = "Invalid Token";
  }

  if (error.name == "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Foreign Key Error";
  }

  if (error.message === `no room password`) {
    statusCode = 400;
    message = "Password is required";
  }

  if (error.name == "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Invalid input type";
  }
  if (error.name == "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Username must be unique";
  }
  if(error.name == "Unauthorized"){
    statusCode = 401
    message = 'Unauthorized'
  }
  if(error.name === "LoginInputError"){
    statusCode = 400
    message = "Email/password is required"
  }
  if(error.name === "InvalidCredential"){
    statusCode = 401
    message = "Unauthorized"
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
