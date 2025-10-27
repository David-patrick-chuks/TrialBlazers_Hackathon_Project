const jwt = require('jsonwebtoken');


exports.toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

exports.generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};
