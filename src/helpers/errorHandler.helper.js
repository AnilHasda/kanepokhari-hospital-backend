const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const success = false;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success,
    message
  });
};

export default errorHandler;
