const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const contactRoutes=require("./routes/contactUs");
const adminRoutes = require("./routes/admin");
const applyRoutes = require("./routes/apply");
const cors=require("cors");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 3000;

database.connect();
// /middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors()); 

app.use(
	fileUpload({ 
		useTempFiles:true,                     //this middeare is for fileupload in local media;
		tempFileDir:"/tmp",
	})
)

cloudinary.cloudinaryConnect();



//sertting up the routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/contact",contactRoutes);

app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/application",applyRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
