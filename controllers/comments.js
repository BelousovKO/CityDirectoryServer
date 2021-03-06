const shortid = require('shortid');
const { validate } = require('jsonschema');
const db = require('../db/db');

const getComments = (req, res, next) => {
  let comments = [];
  try {
    comments = db.get('comments');
  } catch (error) {
    throw new Error(error);
  }
  res.json({
    status: 'OK',
    data: comments
  });
};

const getComment = (req, res, next) => {
  const { id } = req.params;

  const comment = db
    .get('comments')
    .find({ id })
    .value();

  if (!comment) {
    throw new Error('COMMENT_NOT_FOUND');
  }

  res.json({
    status: 'OK',
    data: comment
  });
};

const getCommentsByCity = (req, res, next) => {
  const { city } = req.params;

  const comment = db
    .get('comments')
    .filter({ city })
    .value();

  if (!comment) {
    throw new Error('COMMENT_NOT_FOUND');
  }

  res.json({
    status: 'OK',
    data: comment
  });
};

const createComment = (req, res, next) => {
  const commentSchema = {
    type: 'object',
    properties: {
      text: { type: 'string' },
      userId: { type: 'string' },
      userName: { type: 'string' },
      city: { type: 'string' },
    },
    required: ['text', 'userId', 'userName', 'city'],
    additionalProperties: false
  };

  const validationResult = validate(req.body, commentSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const {
    text, userId, userName, city,
  } = req.body;
  const comment = {
    id: shortid.generate(),
    marked: false,
    text,
    userId,
    userName,
    city,
  };

  try {
    db.get('comments')
      .unshift(comment)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: comment
  });
};

const editComment = (req, res, next) => {
  const { id } = req.params;

  db.get('comments')
    .find({ id })
    .assign(req.body)
    .value();

  db.write();

  const comments = db.get('comments');

  res.json({
    status: 'OK',
    data: comments
  });
};

const deleteComment = (req, res, next) => {
  db.get('comments')
    .remove({ id: req.params.id })
    .write();

  const comments = db.get('comments');

  res.json({
    status: 'OK',
    data: comments
  });
};

module.exports = {
  getComments,
  getComment,
  getCommentsByCity,
  createComment,
  editComment,
  deleteComment
};
