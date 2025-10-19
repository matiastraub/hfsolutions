const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  let message = '';

  if (res.headersSent) {
    console.warn('Headers already sent. Skipping error handler.');
    return;
  }

  // Handle PostgreSQL unique violation (duplicate key)
  // Code 23505 → unique violation
  if (err.code === '23505') {
    message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Handle not null violation
  // Code 23502 → not null violation
  if (err.code === '23502') {
    message = `Missing required field: ${err.column}`;
    error = new ErrorResponse(message, 400);
  }

  // Handle foreign key violation
  // Code 23503 → foreign key violation
  if (err.code === '23503') {
    message = `Invalid reference: ${err.detail}`;
    error = new ErrorResponse(message, 400);
  }

  // Custom validation errors (from your controllers)
  if (err.name === 'ValidationError') {
    message = Array.isArray(err.message) ? err.message.join(', ') : err.message;
    error = new ErrorResponse(message, 400);
  }

  // Fallback for other errors
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server error' });
};

module.exports = errorHandler;
