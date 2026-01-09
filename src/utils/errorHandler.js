// utils/ApiError.js
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}


const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥", err.message, err.statusCode);
  // console.error("ERROR 💥", err.message);
  
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
module.exports = { ApiError, errorHandler };

