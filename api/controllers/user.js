const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.login(username, password)
        
        //create token
        const token = createToken(user._id)
        res.status(200).json({username, token}) 
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.registerUser = async (req, res) => {
    const { email, password, username, phone_number, name } = req.body;
    try {
        const user = await UserModel.signup(email, password, username, phone_number, name)
        
        //create token
        const token = createToken(user._id)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}