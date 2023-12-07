const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../util/generateToken');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //user exit in db..
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists');
    }

    //if user doesnot exist it create a new user..
    const user = await User.create({
        name, email, password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error('Error Occured');
    }
});

//LOGIN USER
const authUser = asyncHandler(async (req, res) => {
    const {  email, password } = req.body;

    const user=await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password")
    }

});


module.exports ={ registerUser, authUser};