const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { UserModel } = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");

// Cookie options — httpOnly so JS can't read the token.
// In production the frontend, dashboard and backend live on different
// *.onrender.com subdomains, which browsers treat as different sites.
// A "lax" cookie is never sent on cross-site requests, so production
// needs sameSite "none" + secure.
const isProd = process.env.NODE_ENV === "production";

const baseCookieOptions = {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
};

const cookieOptions = {
    ...baseCookieOptions,
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
};

// Validation rules
const signupValidation = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("username").notEmpty().trim().withMessage("Username is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
];

// POST /signup
const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
            });
        }

        const { email, username, password } = req.body;

        // Check for existing user
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use",
            });
        }

        const user = await UserModel.create({ email, username, password });
        const token = createSecretToken(user._id);

        res.cookie("token", token, cookieOptions);
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// POST /login
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
            });
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// POST /logout
const logout = async (req, res) => {
    try {
        // Must match the options used when setting the cookie, or it won't clear
        res.clearCookie("token", baseCookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { signup, login, logout, signupValidation, loginValidation };