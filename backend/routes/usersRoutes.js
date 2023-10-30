const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const usersController = require('../controllers/usersController');

router.get('/all', usersController.getAllInfoUser);
router.post('/', usersController.createUser);
router.post('/login', usersController.userLogin);
router.get('/dataUser', verifyJWT, usersController.getCurrentUser);
router.put('/', verifyJWT, usersController.updateUser);
router.put('/follow', verifyJWT, usersController.userFollow);
router.get('/profileData/:username', usersController.getProfileData);
router.get('/userIsFollowByCurrentUser/:username', verifyJWT, usersController.userIsFollowByCurrentUser);

module.exports = router;