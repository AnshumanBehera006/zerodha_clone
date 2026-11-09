const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

// POST /verify — check if the user is logged in (used by frontend/dashboard)
const userVerification = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.json({ status: false });
        }

        return res.json({
            status: true,
            user: user.username,
        });
    } catch (err) {
        return res.json({ status: false });
    }
};

// Middleware for protected API routes
const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = { userVerification, requireAuth };

