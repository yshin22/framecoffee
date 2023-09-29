import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'


// @desc Auth user & get token 
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    //check if user exists and has valid password
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        
        // creating json token
        // place secret in env not here for security reasons
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        // Set JWT as HTTP-Only cookit
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // (milliseconds) 30 days
        })
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }

});

// @desc Register user 
// @route POST /api/api/users
// @access public
const registerUser = asyncHandler(async (req,res) => {
    res.send('reigster user');
});

// @desc Logout user 
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req,res) => {
    res.send('logout user');
});

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req,res) => {
    res.send('get user profile');
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req,res) => {
    res.send('update user profile');
});

// @desc Get user 
// @route GET /api/users
// @access private/ADmin
const getUsers = asyncHandler(async (req,res) => {
    res.send('get users');
});

// @desc Get user by ID
// @route GET /api/users/:ID
// @access private/ADmin
const getUserById = asyncHandler(async (req,res) => {
    res.send('get user by ID');
});

// @desc Delete user 
// @route DELETE /api/users/:id
// @access private/ADmin
const deleteUser = asyncHandler(async (req,res) => {
    res.send('delete users');
});

// @desc Update user 
// @route PUT /api/users/:id
// @access private/ADmin
const updateUser = asyncHandler(async (req,res) => {
    res.send('update users');
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}


