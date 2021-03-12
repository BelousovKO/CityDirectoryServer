const shortid = require('shortid');
const { validate } = require('jsonschema');
const db = require('../db/db');

const getUsers = (req, res, next) => {
  let users = [];
  try {
    users = db.get('users');
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'OK', data: users });
};

const getUser = (req, res, next) => {
  const { userName } = req.params;

  const user = db
    .get('users')
    .find({ userName })
    .value();

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  res.json({ status: 'OK', data: user });
};

const createUserM = (req, res, next) => {
  const userSchema = {
    type: 'object',
    properties: {
      userName: { type: 'string' },
      password: { type: 'string' },
      userMail: { type: 'string' }
    },
    required: ['userName', 'password', 'userMail'],
    additionalProperties: false
  };

  const validationResult = validate(req.body, userSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const { userName, password, userMail } = req.body;
  const user = {
    id: shortid.generate(),
    userName,
    password,
    userMail
  };

  try {
    db.get('users')
      .push(user)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: user
  });
};

const createUser = (req, res, next) => {
  const userSchema = {
    type: 'object',
    properties: {
      userName: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['userName', 'password'],
    additionalProperties: false
  };

  const validationResult = validate(req.body, userSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const { userName, password } = req.body;
  const user = {
    id: shortid.generate(),
    userName,
    password
  };

  try {
    db.get('users')
      .push(user)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: user
  });
};

const deleteUser = (req, res, next) => {
  db.get('users')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
};

module.exports = {
  getUsers,
  getUser,
  createUserM,
  createUser,
  deleteUser
};
