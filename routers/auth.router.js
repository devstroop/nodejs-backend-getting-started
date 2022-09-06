const express = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middlewares/user.middleware');

const authRouter = express.Router();

/// Sign Up /
authRouter.post('/api/signup', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const existing = await User.findOne({ email });
        if(existing){
            return res
                .status(400)
                .json({ msg: 'User with this email already exists!'});
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,
            name
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.post('/api/signin', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res
                .status(400)
                .json({ msg: 'User with this email does not exists!' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res
                .status(400)
                .json({ msg: 'Invalid password.' });
        }
        const token = jwt.sign({ id: user._id }, 'passwordKey');
        res.json({ token, ...user._doc });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.get('/', userMiddleware, async(req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
});

module.exports = authRouter;