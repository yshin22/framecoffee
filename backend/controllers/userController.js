import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';


// @desc Auth user & get token 
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    //check if user exists and has valid password
    const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))) {
            if (user?.isAdmin === true) {

                generateToken(res, user._id);
        
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                });
            } else {
                res.status(401);
                throw new Error('Authorized users only')
            }
        } else {
            res.status(401);
            throw new Error('Invalid Email or Password');
        }

});

// @desc Register user 
// @route POST /api/api/users
// @access public
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password} = req.body ;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {

        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logout user 
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req,res) => {
    res.clearCookie('jwt');

    res.status(200).json({message: 'logged out successfully'});
});

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.user._id);

    if ( user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id);
    
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('User not found');
    }
});

// @desc Get user 
// @route GET /api/users
// @access private/ADmin
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc Get user by ID
// @route GET /api/users/:ID
// @access private/ADmin
const getUserById = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User no found');
    }
});

// @desc Delete user 
// @route DELETE /api/users/:id
// @access private/ADmin
const deleteUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({_id: user._id});
        res.status(201).json({message: 'User deleted successfully'});
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Update user 
// @route PUT /api/users/:id
// @access private/ADmin
const updateUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.emailm,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
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
    updateUser,
}


