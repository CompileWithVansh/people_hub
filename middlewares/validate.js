function validateEmployee(req, res, next) {
  const { fullName, email, mobile } = req.body;

  if (!fullName) {
    return res.status(400).json({ message: 'Full name is required' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (mobile && !/^\d+$/.test(mobile)) {
    return res.status(400).json({ message: 'Mobile should contain only digits' });
  }

  next();
}

function validateId(req, res, next) {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  next();
}

module.exports = { validateEmployee, validateId };
