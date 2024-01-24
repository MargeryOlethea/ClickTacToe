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
  if (error.message === `not found`) {
    statusCode = 404;
    message = "Room Not Found";
  }

  if (error.message === `room full`) {
    statusCode = 403;
    message = "Room is full";
  }
  if (error.message === `forbidden`) {
    statusCode = 403;
    message = "Cannot enter room";
  }

  if (error.message === `wrong password`) {
    statusCode = 401;
    message = "Wrong Password";
  }

  if (error.name == "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Invalid input type";
  }
  if (error.name == "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Username must be unique";
  }
  if (error.name == "Unauthorized") {
    statusCode = 401;
    message = "Unauthorized";
  }
  if (error.name === "LoginInputError") {
    statusCode = 400;
    message = "Email/password is required";
  }
  if (error.name === "InvalidCredential") {
    statusCode = 401;
    message = "Invalid username/password ";
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
