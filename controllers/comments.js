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
  res.json({ status: 'OK', data: comments });
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

  res.json({ status: 'OK', data: comment });
};

const createComment = (req, res, next) => {
  const commentSchema = {
    type: 'object',
    properties: {
      text: { type: 'string' },
      description: { type: 'string' },
      userId: { type: 'string' }
    },
    required: ['text', 'description', 'userId'],
    additionalProperties: false
  };

  const validationResult = validate(req.body, commentSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const { text, description, userId } = req.body;
  const comment = {
    id: shortid.generate(),
    text,
    description,
    userId
  };

  try {
    db.get('comments')
      .push(comment)
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

  const editedComment = db
    .get('comments')
    .find({ id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: editedComment });
};

const deleteComment = (req, res, next) => {
  db.get('comments')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
};

module.exports = {
  getComments,
  getComment,
  createComment,
  editComment,
  deleteComment
};
