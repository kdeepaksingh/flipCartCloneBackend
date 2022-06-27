const userModel = require('../../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = async (req, res) => {
    userModel.findOne({ email: req.body.email }).exec((error, user) => {
        if (user) return res.status(400).json({ message: 'Admin Already Registered!!' })
    });

    userModel.estimatedDocumentCount(async (err, count) => {
        if (err) return res.status(400).json({ error });
        let role = "admin";
        if (count === 0) {
            role = "super-admin";
        }
        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new userModel({
            firstName,
            lastName,
            email,
            hash_password,
            userName: shortid.generate(),
            role: 'admin'
        });
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'Something Went Wrong!!'
                });
            }
            if (data) {
                return res.status(201).json({
                    user: 'Admin Created Successfully!!'
                });
            }
        });
    });
}

exports.signin = async (req, res) => {
    userModel.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword && (user.role === "admin" || user.role === "super-admin")) {
                const token = jwt.sign({ _id: user._id, role: user.role }, 'process.env.JWT_SECRET', { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.cookie("token", token, { expiresIn: "1h" });
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


exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
      message: "Signout successfully...!",
    });
};
