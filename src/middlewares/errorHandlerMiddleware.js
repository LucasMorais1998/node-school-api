export default function errorHandler(err, req, res) {
  console.error(err);

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      errors: err.errors.map((error) => error.message),
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({ errors: [err.message] });
  }

  return res.status(500).json({ errors: ['An unexpected error occurred.'] });
}
