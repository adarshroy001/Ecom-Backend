import jwt from 'jsonwebtoken';

export default isAuthenticated = (req,res,next)=>{
    const token = req.header('Authorization'); // Expecting 'Bearer <token>'
    if (!token) return res.status(401).json({ message: 'Access denied. No token Found . Check isAuthenticated' });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}