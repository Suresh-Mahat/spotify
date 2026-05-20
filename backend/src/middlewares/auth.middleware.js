const jwt = require("jsonwebtoken");

 async function isvalidUser(req, res, next) {
     const token = req.cookies.token;

    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    req.id = id;
    next()
 }
   

 module.exports = isvalidUser;
   
