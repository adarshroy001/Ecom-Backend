import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Expecting 'Bearer <token>'
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Extract the token after 'Bearer'
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. Token format is invalid.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload (user info) to the request
        console.log('Authenticated User:', req.user); // Debug log
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('JWT Verification Error:', error.message); // Log the error for debugging
        res.status(403).json({ message: 'Invalid or expired token.', error: error.message });
    }
};

export default isAuthenticated;

