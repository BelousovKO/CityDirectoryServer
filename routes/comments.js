const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');

// GET /comments
router.get('/', commentsController.getComments);

// GET /comments/:id
router.get('/:id', commentsController.getComment);

// POST /comments
router.post('/', commentsController.createComment);

// POST /comments/byCity/:city
router.get('/byCity/:city', commentsController.getCommentsByCity);

// POST /comments/byUserId/:UserId
router.get('/byUserId/:userId', commentsController.getCommentsByUserId);

// PATCH /comments/:id
router.patch('/:id', commentsController.editComment);

// DELETE /comments/:id
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
