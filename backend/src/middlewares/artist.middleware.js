const jwt = require("jsonwebtoken");
const userModel = require('../models/User.model');

async function verifyArtist(req, res, next) {
  try {
    // 1. FIXED: Changed 'res.cookies' to 'req.cookies'
    const token = req.cookies?.token; 
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
    }

    // 2. Token decode karke User ID nikalna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    // 3. Database se user dhoondhna
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const role = user.role;

    // 4. ROLE VALIDATION: Agar artist nahi hai toh block karo
    if (role !== "artist") {
      return res.status(403).json({ 
        success: false, 
        message: "Forbidden: Only artists can access this route" 
      });
    }

    // 5. User detail ko req object me attach kiya taaki controllers me use ho sake
    req.user = user;
    req.id = user._id;
    
    // 6. FIXED: Added next() to move to the controller
    next();

  } catch (error) {
    console.log("Error inside verifyArtist middleware:", error.message);
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
}

module.exports = verifyArtist;