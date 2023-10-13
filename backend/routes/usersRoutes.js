const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/all', usersController.getAllInfoUser);
router.post('/', usersController.createUser);
router.post('/userLogin', usersController.userLogin);
router.post('/dataUser', usersController.getCurrentUser);

module.exports = router;