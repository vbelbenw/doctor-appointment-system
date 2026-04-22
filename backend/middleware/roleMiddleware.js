const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // req.user is set by verifyToken middleware
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: "Unauthorized: No user information found" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Forbidden: Access denied for role '${req.user.role}'` 
            });
        }

        next();
    };
};

module.exports = { authorizeRoles };
