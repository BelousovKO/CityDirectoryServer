const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

// GET /users
router.get('/', usersController.getUsers);

// GET /users/:userName
router.get('/:userName', usersController.getUser);

// POST /users
router.post('/', usersController.createUser);

// DELETE /users/:id
router.delete('/:id', usersController.deleteUser);

module.exports = router;
