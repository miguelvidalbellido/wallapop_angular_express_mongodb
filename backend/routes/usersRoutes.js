const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const usersController = require('../controllers/usersController');

router.get('/all', usersController.getAllInfoUser);
router.post('/', usersController.createUser);
router.post('/login', usersController.userLogin);
router.get('/dataUser', verifyJWT, usersController.getCurrentUser);
router.put('/update', verifyJWT, usersController.updateUser);

module.exports = router;