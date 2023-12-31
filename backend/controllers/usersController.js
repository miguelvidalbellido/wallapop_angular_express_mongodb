const asyncHandler = require('express-async-handler');

// Import models
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Product = require('../models/Product');


//////////////////////////////////////////////////
/////////       CREATE_USER           ///////////
////////////////////////////////////////////////

const createUser = asyncHandler(async (req, res) => {
    // const { username, email, passwordHash, userBio, f_nac, cp, profileImage } = req.body.user;
    const { username, email, password, profileImage } = req.body.user;

    let defaultProfileImage = "";

    if(!username || !email || !password) {
        res.status(400).json({message: "All fields are required"})
    }

    const usernameExists = await User.findOne({username: username});
    
    if(usernameExists !== null) {
        return res.status(411).send({message: 'username already exists'});
    }

    const emailExists = await User.findOne({email: email});

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
    const hashedPassword = await bcrypt.hash(password, 10);

    //const createdUser = await User.create({username, email, passwordHash: hashedPassword, userBio, f_nac, cp, profileImage: defaultProfileImage});
    const createdUser = await User.create({username, email, passwordHash: hashedPassword, profileImage: defaultProfileImage, productsLike: [], usersFollowing: []});
    if(createdUser) {
        res.status(201).json({
            user: await createdUser.toUserResponseWithToken()
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
    // Se puede realizar el login por email o username, como el front solo tiene username, aqui haremos la distincion
    const { email, password } = req.body.user;

    const loginUser = await User.findOne({$or: [{email: email}, {username: email}]});
    
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
        user: await loginUser.toUserResponseWithToken()
    })

})

//////////////////////////////////////////////////
/////////          CURRENT_USER           ///////
////////////////////////////////////////////////

const getCurrentUser = asyncHandler(async (req,res) => {
    const email = req.userEmail;
    if(!email) {
        return res.status(404).json({
            message: "Email Error"
        });
     }

     const user = await User.findOne({email: email});

    if(!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    return res.status(200).json({
        user: await user.toUserResponseWithToken()
    });

})


//////////////////////////////////////////////////
/////////          PROFILE_DATA           ///////
////////////////////////////////////////////////

const getProfileData = asyncHandler(async (req,res) => {
    const { username } = req.params; 
    if(!username) {
        return res.status(404).json({
            message: "Username Error"
        });
     }

     const user = await User.findOne({username: username});

    if(!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    // Ni ha que buscar els productes que te pujats
    const count_products = await Product.count({
        productOwner: user.id
    }).exec();
    // Ni ha que buscar numero de likes que li han donat

    const productsUser = await Product.find({productOwner: user.id});
    
    let countLikes = 0 
    productsUser.map(data => {
        countLikes += data.favouritesCount;
    })

    // Ni ha que buscar el numero de seguidors
    const count_followers = await User.count({
        usersFollowing: {$in: user.id}
    }).exec();

    return res.status(200).json({
        user: await user.toUserResponseProfileData(count_products, count_followers, countLikes)
    });

})

//////////////////////////////////////////////////
/////////          PROFILE_DATA           ///////
////////////////////////////////////////////////

const getProfileStats = asyncHandler(async (req,res) => {
    const userEmail = req.userEmail; 
    if(!userEmail) {
        return res.status(404).json({
            message: "Username Error"
        });
     }

    const user = await User.findOne({email: userEmail});

    if(!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    // Ni ha que buscar els productes que te pujats
    const count_products = await Product.count({
        productOwner: user.id
    }).exec();
    // Ni ha que buscar numero de likes que li han donat

    const productsUser = await Product.find({productOwner: user.id});
    
    let countLikes = 0 
    productsUser.map(data => {
        countLikes += data.favouritesCount;
    })

    // Ni ha que buscar el numero de seguidors
    const count_followers = await User.count({
        usersFollowing: {$in: user.id}
    }).exec();

    return res.status(200).json({
        stats: await user.toUserResponseProfileStats(count_products, count_followers, countLikes)
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
            return await user.toUserResponseWithToken();
        })),
        usersCount: getUsersCount
    })
})

//////////////////////////////////////////////////
/////////           UPDATE_USER           ///////
////////////////////////////////////////////////

const updateUser = asyncHandler(async (req, res) => {
    const { user } = req.body;

    // confirm data
    if (!user) {
        return res.status(400).json({message: "Required a User object"});
    }

    const email = req.userEmail;

    const target = await User.findOne({ email: email }).exec();
    
    if (!target) {
        // Si no se encontró un usuario con ese email, puedes manejarlo como quieras
        return res.status(404).json({ message: "User not found" });
    }

    if (user.email) {
        target.email = user.email;
    }
    if (user.username) {
        target.username = user.username;
    }
    if (user.password) {
        const hashedPwd = await bcrypt.hash(user.passwordHash, 10);
        target.passwordHash = hashedPwd;
    }
    if (user.profileImage) {
        target.profileImage = user.profileImage;
    }
    if (user.userBio) {
        target.userBio = user.userBio;
    }

    await target.save();

    return res.status(200).json({
        user: await target.toUserResponseWithToken()
    });

});

//////////////////////////////////////////////////
/////////          FOLLOW_USERS           ///////
////////////////////////////////////////////////

const userFollow = asyncHandler(async (req, res) => {
    const userEmail = req.userEmail; 
    const { username } = req.body;

    const user = await User.findOne({email: userEmail}).exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const userToFollow = await User.findOne({username: username}).exec();
    
    if (!userToFollow) {
        return res.status(404).json({ message: "User to follow not found" });
    }

    const isFollowing = await user.isFollowing(userToFollow.id);

    if(isFollowing) {
        await user.unfollow(userToFollow.id);
    } else {
        await user.follow(userToFollow.id);
    }

    return res.status(200).json({
        response: true
    });

})

//////////////////////////////////////////////////
/////////          FOLLOW_USERS           ///////
////////////////////////////////////////////////
const userIsFollowByCurrentUser = asyncHandler(async (req, res) => {
    const userEmail =  req.userEmail;
    const { username } = req.params;

    const userLogged = await User.findOne({email: userEmail}).exec();

    if(!userLogged) {
        return res.status(404).json({ message: "User not found - [userIsFollowByCurrentUser]" });
    }

    const profile_user = await User.findOne({ username: username }).exec();

    if(!profile_user) {
        return res.status(404).json({ message: "User not found - [userIsFollowByCurrentUser]" });
    }

    const isFollowing = await userLogged.isFollowing(profile_user.id);

    return res.status(200).json({
        isFollowing: await isFollowing
    });

})

const usersFollowed = asyncHandler(async (req, res) => {
    
    const userEmail = req.userEmail;
    
    const _user = await User.findOne({email: userEmail}).exec();

    const usersFollowed = await User.find({_id: {$in: _user.usersFollowing}}).exec()

    return res.status(200).json({
        users: await Promise.all(usersFollowed.map(async user => {
            return await user.toUserResponseProfileData();
        }))
    })
}) 

module.exports = {
    createUser,
    getAllInfoUser,
    userLogin,
    getCurrentUser,
    updateUser,
    userFollow,
    getProfileData,
    userIsFollowByCurrentUser,
    usersFollowed,
    getProfileStats
}