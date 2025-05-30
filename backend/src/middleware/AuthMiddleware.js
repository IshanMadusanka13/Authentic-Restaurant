const jwt = require("jsonwebtoken");  

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    
    let token;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        token = authHeader;
    }
    
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (error) {
        
        res.status(401).json({ msg: "Invalid token" });
    }
};