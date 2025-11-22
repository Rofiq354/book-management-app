module.exports = (err, req, res, next) => {
  console.error("[ERROR]:", err);

  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  // --- TIPE-TIPE ERROR OTOMATIS ---

  // ID tidak valid (CastError dari Mongoose)
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format!";
  }

  // Validasi Mongoose gagal (required, minlength, etc)
  if (err.name === "ValidationError") {
    status = 400;
    message = err.message;
  }

  // Duplikasi key MongoDB (unique)
  if (err.code === 11000) {
    status = 400;
    message = "Duplicate data detected!";
  }

  // Forbidden
  if (err.name === "ForbiddenError") {
    status = 403;
    message = "Access forbidden!";
  }

  // Unauthorized
  if (err.name === "UnauthorizedError") {
    status = 401;
    message = "Unauthorized!";
  }

  // Not Found
  if (err.name === "NotFoundError") {
    status = 404;
    message = "Page not found!";
  }

  // Fallback untuk error lainnya
  return res.status(status).render("error", {
    status,
    message,
    layout: false, // MENONAKTIFKAN main layout
  });
};
