const asyncHandler = require('express-async-handler');

// Import models
const User = require('../models/User');



//////////////////////////////////////////////////
/////////       CREATE_USER           ///////////
////////////////////////////////////////////////

const createUser = asyncHandler(async (req, res) => {
    
    const { username, email, passwordHash, userBio, f_nac, cp, profileImage } = req.body;

    if(!username || !email || !passwordHash || !userBio || !f_nac || !cp || !profileImage) {
        res.status(400).json({message: "All fields are required"})
    }

    const user = await User.create({username, email, passwordHash, userBio, f_nac, cp, profileImage});

    await user.save();
    
    return await res.status(200).json({
        ok: 'ok'
    })
})


//////////////////////////////////////////////////
/////////       LIST_CATEGORIES_SHORT     ///////
////////////////////////////////////////////////

const getInfoUser = asyncHandler(async (req, res) => {
    let query = {};

    const getUsers = await User.find(query)
    const getUsersCount = await User.count(query)

    return res.status(200).json({
        users: await Promise.all(getUsers.map(async user => {
            return await user.toUserResponse();
        })),
        usersCount: getUsersCount
    })
})

module.exports = {
    createUser,
    getInfoUser
}