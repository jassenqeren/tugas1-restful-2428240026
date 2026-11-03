const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && err.body) {
    return res.status(400).json({
      status: "error",
      message: "JSON tidak valid",
      data: null
    });
  }

  console.error(err);

  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
    data: null
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
};

module.exports = {
  errorHandler,
  notFound
};