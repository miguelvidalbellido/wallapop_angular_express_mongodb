const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const usersController = require('../controllers/usersController');

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Get all user information
 *     description: Retrieve a list of all users and their information
 *     responses:
 *       200:
 *         description: A list of all users and their information
 */
router.get('/all', usersController.getAllInfoUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Create a new user
 *     description: Create a new user with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The newly created user
 */
router.post('/', usersController.createUser);
router.post('/login', usersController.userLogin);

/**
 * @swagger
 * /api/users/dataUser:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Get current user information
 *     description: Retrieve the information of the currently logged in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The information of the currently logged in user
 */
router.get('/dataUser', verifyJWT, usersController.getCurrentUser);

/**
 * @swagger
 * /api/users:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Update current user information
 *     description: Update the information of the currently logged in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated information of the currently logged in user
 */
router.put('/', verifyJWT, usersController.updateUser);

/**
 * @swagger
 * /api/users/follow:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Follow a user
 *     description: Follow the user with the given username
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Username'
 *     responses:
 *       200:
 *         description: The updated information of the currently logged in user
 */
router.put('/follow', verifyJWT, usersController.userFollow);

/**
 * @swagger
 * /api/users/profileData/{username}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Get user profile information
 *     description: Retrieve the profile information of the user with the given username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve profile information for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The profile information of the user with the given username
 */
router.get('/profileData/:username', usersController.getProfileData);

/**
 * @swagger
 * /api/users/userIsFollowByCurrentUser/{username}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Check if user is followed by current user
 *     description: Check if the user with the given username is followed by the currently logged in user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to check if followed by the currently logged in user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Whether or not the user with the given username is followed by the currently logged in user
 */
router.get('/userIsFollowByCurrentUser/:username', verifyJWT, usersController.userIsFollowByCurrentUser);

/**
 * @swagger
 * /api/users/usersFollowed:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Get users followed by current user
 *     description: Retrieve a list of all users followed by the currently logged in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users followed by the currently logged in user
 */
router.get('/usersFollowed/', verifyJWT, usersController.usersFollowed);

/**
 * @swagger
 * /api/users/userProfileStats:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Get stats for current user
 *     description: Retrieve a list of stats by the currently logged in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all stats by the currently logged in user
 */
router.get('/userProfileStats/', verifyJWT, usersController.getProfileStats);

module.exports = router;