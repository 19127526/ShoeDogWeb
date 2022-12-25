const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = async (req, res) => {
    const {username, password, confirmPassword} = req.body;
    const isNewUser = await User.inThisEmailInUse(username);
    if (!isNewUser) return res.status(400).send({'error': 'User already registered'});
    const userAdd = await User.createUser({username, password});
    const user = await User.findUserById(userAdd)
    return res.json({success: true, user})
}

exports.userSignIn = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findUserByUserName(username);
    if (!user) return res.status(400).send({'error': 'User not found'});
    const isPasswordMatch = await User.comparePassword(password,user.Password);
    if (!isPasswordMatch) return res.status(400).send({'error': 'Password is incorrect'});
    const token = jwt.sign({userId: user.UserId}, process.env.JWT_SECRET,
        {expiresIn: '1d'})
    await User.findByIdAndUpdateToken(user.UserId, token);

    return res.json({success: true, user, token})
}
exports.signOut = async (req, res) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res
                .status(401)
                .json({success: false, message: 'Authorization fail!'});
        }


        await User.findByIdAndUpdateToken(req.user.UserId, null);
        res.json({success: true, message: 'Sign out successfully!'});
    }
};
