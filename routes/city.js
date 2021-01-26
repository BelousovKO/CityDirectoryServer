const express = require('express');

const router = express.Router();

const usersController = require('../controllers/city');

// GET /city/:cityName
router.get('/:cityName', usersController.getCity);

module.exports = router;
