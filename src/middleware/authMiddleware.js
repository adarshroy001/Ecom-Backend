import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
// Check if the token is present
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ message: "Invalid or expired token.", error: error.message });
    }
};

export default isAuthenticated;
