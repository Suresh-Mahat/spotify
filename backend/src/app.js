const express = require("express");
const cors = require("cors");
const authUser = require('./routes/auth.routes')
const profileRouters = require("./routes/profile.routes")
const songRouters = require("./routes/song.routes")


const cookieParser = require("cookie-parser");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth",authUser)
app.use("/api/profile",profileRouters)
app.use("/api/song",songRouters)





module.exports = app;