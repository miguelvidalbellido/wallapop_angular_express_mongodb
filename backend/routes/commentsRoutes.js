const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const commentsController = require('../controllers/commentsController');

router.get('/:slugProduct', verifyJWT, commentsController.listComments);

module.exports = router;