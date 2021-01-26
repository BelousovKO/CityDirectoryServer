const db = require('../db/db');

const getCity = (req, res, next) => {
  const { cityName } = req.params;

  const city = db
    .get('city')
    .find({ cityName })
    .value();

  if (!city) {
    throw new Error('CITY_NOT_FOUND');
  }

  res.json({ status: 'OK', data: city });
};

module.exports = {
  getCity
};
