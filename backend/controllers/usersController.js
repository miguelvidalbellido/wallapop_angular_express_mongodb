const asyncHandler = require('express-async-handler');

// Import models
const User = require('../models/User');
const bcrypt = require('bcrypt');



//////////////////////////////////////////////////
/////////       CREATE_USER           ///////////
////////////////////////////////////////////////

const createUser = asyncHandler(async (req, res) => {
    
    const { username, email, passwordHash, userBio, f_nac, cp, profileImage } = req.body;
    let defaultProfileImage = "";
    if(!username || !email || !passwordHash || !userBio || !f_nac || !cp) {
        res.status(400).json({message: "All fields are required"})
    }

    const usernameExists = await User.findOne({username: req.body.username});
    
    if(usernameExists !== null) {
        return res.status(411).send({message: 'username already exists'});
    }

    const emailExists = await User.findOne({email: req.body.email});

    if(emailExists !== null) {
        return res.status(411).send({message: 'email already exists'});
    }

    // Añadimos avatar si no tiene una foto de perfil
    if(!profileImage) {
        defaultProfileImage = "https://i.pravatar.cc/500?u="+username;
    } else {
        defaultProfileImage = profileImage;
    }

    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    const createdUser = await User.create({username, email, passwordHash: hashedPassword, userBio, f_nac, cp, profileImage: defaultProfileImage});

    if(createdUser) {
        res.status(201).json({
            user: await createdUser.toUserResponse()
        })
    } else {
        res.status(422).json({
            errors: {
                body: "Unable to register a user"
            }
        })
    }
    
    
})


//////////////////////////////////////////////////
/////////            LOGIN_USER           ///////
////////////////////////////////////////////////

const userLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const loginUser = await User.findOne({username: username});

    if(!loginUser) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    const passwordMatch = await bcrypt.compare(password, loginUser.passwordHash);

    if(!passwordMatch) {
        return res.status(401).json({
            message: "Unauthorized: Wrong password"
        });
    }

    return res.status(200).json({
        user: await loginUser.toUserResponse()
    })

})

//////////////////////////////////////////////////
/////////          CURRENT_USER           ///////
////////////////////////////////////////////////

const getCurrentUser = asyncHandler(async (req,res) => {
    const username = req.body.username;

    const user = await User.findOne({username: username});

    if(!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    return res.status(200).json({
        user: await user.toUserResponse()
    });

})

//////////////////////////////////////////////////
/////////            LIST_USERS           ///////
////////////////////////////////////////////////

const getAllInfoUser = asyncHandler(async (req, res) => {
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
    getAllInfoUser,
    userLogin,
    getCurrentUser
}