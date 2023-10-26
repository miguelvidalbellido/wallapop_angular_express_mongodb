const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const commentsController = require('../controllers/commentsController');

router.get('/:slugProduct', commentsController.listComments);

module.exports = router;