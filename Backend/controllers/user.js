const { Router } = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Joi = require('joi');
const { Types } = require("mongoose");

const userRouter = Router();

const { SECRET_JWT_CODE = "jafha71yeiqquy1#@!" } = process.env;

// Register new user
userRouter.post("/register", async (req, res) => {
    try {
        let { name, email, password, type } = req.body

        // Input validation
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string()
                .min(8)
                .max(50)
                .required()
                .email(),
            password: Joi.string()
                .min(6)
                .required()
                .max(20)
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
                .messages({
                    "string.base": `"password" should be a type of 'text'`,
                    "string.pattern.base": `"password" should have one uppercase, lowercase, digit and special character`,
                    "string.min": `"password" should have min 6 characters`,
                    "string.max": `"password" should have max 20 characters`,
                    "any.required": `"password" is a required field`
                }),
            type: Joi.string().valid("admin", "seeker", "owner"),
        })

        const { error } = schema.validate({ name, email, password, type });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ error: "Email already in use" })
            }
            else {
                // Password encryption
                password = bcrypt.hashSync(password, 10);
                const user = await User.create({ name, email, password, type });
                res.json(user);
            }
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});


// Get user list
userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find({});

        res.json(users);
    } catch (error) {
        console.error('error ', error);
        res.status(400).json({ error });
    }
});


// Login existing user
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        // Input validation
        const schema = Joi.object({
            email: Joi.string()
                .min(8)
                .max(50)
                .required()
                .email(),
            password: Joi.string()
                .min(6)
                .required()
                .max(20)
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
                .messages({
                    "string.base": `"password" should be a type of 'text'`,
                    "string.pattern.base": `"password" should have one uppercase, lowercase, digit and special character`,
                    "string.min": `"password" should have min 6 characters`,
                    "string.max": `"password" should have max 20 characters`,
                    "any.required": `"password" is a required field`
                }),
        })

        const { error } = schema.validate({ email, password });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const user = await User.findOne({ email });
            if (user) {
                // Check if password matches
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    // Generating and sending JWT token for authorization
                    const token = await jwt.sign({ email: user.email }, SECRET_JWT_CODE);
                    res.json({ user, token });
                } else {
                    res.status(400).json({ error: "password doesn't match" });
                }
            } else {
                res.status(400).json({ error: "User doesn't exist" });
            }
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Reset password
userRouter.post("/resetPassword/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body

        console.log('id - ', id);
        console.log('password ', password);
        if (Types.ObjectId.isValid(id)) {
            const user = await User.findById({ _id: id })
            if (!user) {
                res.status(400).json({ error: "Provide correct user id" })
            }
            else {
                // Input validation
                const schema = Joi.object({
                    password: Joi.string()
                        .required()
                        .min(8)
                        .max(20)
                        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
                        .messages({
                            "string.base": `"password" should be a type of 'text'`,
                            "string.pattern.base": `"password" should have one uppercase, lowercase, digit and special character`,
                            "string.min": `"password" should have min 8 characters`,
                            "string.max": `"password" should have max 20 characters`,
                            "any.required": `"password" is a required field`
                        }),
                })

                const { error } = schema.validate({ password });
                if (error) {
                    res.status(400).json({ error: error.details[0].message });
                }
                else {
                    // Encrypting password before updating user
                    if (password) {
                        user.password = bcrypt.hashSync(password, 10);
                    }
                    user.save().then(user => {
                        res.json({ user, message: 'Password updated successfully' });
                    })
                }
            }
        }
        else {
            res.status(400).json({ error: "Invalid id" })
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});


// Update user
userRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { cash, interac, } = req.body

        console.log('id - ', id);
        if (Types.ObjectId.isValid(id)) {
            const user = await User.findById({ _id: id })
            if (!user) {
                res.status(400).json({ error: "Provide correct user id" })
            }
            else {
                if (typeof cash !== "boolean" && !interac) {
                    res.status(400).json({ error: 'Must provide cash or interac' });
                }
                else {
                    if (typeof cash === "boolean") {
                        user.cash = cash
                    }
                    if (interac) {
                        user.interac = interac
                    }
                    user.save().then(user => {
                        res.json({ user, message: 'Password updated successfully' });
                    })
                }
            }
        }
        else {
            res.status(400).json({ error: "Invalid id" })
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});

// Delete user
userRouter.route('/delete/:id').delete(async (req, res) => {
    try {
        const { id } = req.params

        // Validate id and delete user if exist
        if (Types.ObjectId.isValid(id)) {
            const user = await User.findByIdAndDelete({ _id: id })

            if (user) {
                res.json({ message: "User deleted successfully" })
            }
            else {
                res.status(404).json({ error: "User not found" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid user id" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }

});


module.exports = userRouter