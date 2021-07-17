import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import dotenv from "dotenv"
dotenv.config()

// @route   POST/users/signup
// @desc    create and login a user
// @access  Public
const create = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const newUser = new UserModel({
            name,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        const payload = {
            user: { id: newUser.id },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: newUser });
            }
        );
    } catch (error) {
        res.status(400).send(error);
    }
};

// @route   POST/users/signin
// @desc    login a user and get token
// @access  Public
const authorize = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        delete user.password

        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            }
        );
    } catch (error) {
        res.status(400).send(error);
    }
};

// @route   GET/users/:id
// @desc    get user by id
// @access  Public
const show = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        res.status(200).send(user)
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
};


// @route   GET/users/
// @desc    get a list of users
// @access  Public
const index = async (req, res) => {
    try {
        let user = await UserModel.find({}).select("-password").limit(2);
        if (!user) {
            return res.status(400).json({ msg: "User list not found" });
        }
        res.status(200).send(user)
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
};


// @route   PUT/users/:id
// @desc    update a user
// @access  Public
const update = async (req, res) => {
    try {
        let user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        res.status(200).send(user)
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
};

// @route   DELETE/users/:id
// @desc    delete a user
// @access  Public
const destroy = async (req, res) => {
    try {
        let user = await UserModel.findByIdAndRemove(req.params.id, req.body);
        if (!user) {
            return res.status(400).json({ msg: "User cannot be deleted" });
        }
        res.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
};

export default {
    create,
    authorize,
    show,
    index,
    update,
    destroy
}