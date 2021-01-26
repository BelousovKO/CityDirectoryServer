const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');

// GET /comments
router.get('/', commentsController.getComments);

// GET /comments/:id
router.get('/:id', commentsController.getComment);

// GET /comments/byCity/:city
router.get('/byCity/:city', commentsController.getCommentsByCity);

// POST /comments
router.post('/', commentsController.createComment);

// PATCH /comments/:id
router.patch('/:id', commentsController.editComment);

// DELETE /comments/:id
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
