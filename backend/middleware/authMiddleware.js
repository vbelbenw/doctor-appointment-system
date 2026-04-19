const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Read the token from the standard Authorization header
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied: No token provided or invalid format" });
    }

    // Remove the 'Bearer ' prefix
    token = token.split(' ')[1];

    try {
        // Verify token with our secret
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the verified user payload (id, role) to the request
        req.user = verified;
        next(); // Proceed to the actual route handler
    } catch (error) {
        return res.status(401).json({ message: "Access Denied: Invalid or expired token" });
    }
};

module.exports = { verifyToken };
