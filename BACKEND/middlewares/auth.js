const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
    
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Token not provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
    }
};

module.exports = { validateUser };
