const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    userModel.findOne({ email: req.body.email }).exec((error, user) => {
        if (user) return res.status(400).json({ message: 'User Already Registered!!' })
    });
    const {
        firstName,
        lastName,
        userName,
        email,
        password } = req.body;
    const _user = new userModel({
        firstName,
        lastName,
        email,
        password,
        userName: Math.random().toString()
    });

    _user.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: 'Something Went Wrong!!'
            });
        }
        if (data) {
            return res.status(201).json({
                user: 'User Created Successfully!!'
            });
        }
    });
}

exports.signin = (req, res) => {
    userModel.findOne({ email: req.body.email }).exec((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id, role: user.role }, 'process.env.JWT_SECRET', { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                });
            } else {
                return res.status(400).json({
                    message: 'Invalid Password!!'
                });
            }
        } else {
            return res.status(400).json({ message: 'Something Went Wrong!!!' })
        }
    });
}

