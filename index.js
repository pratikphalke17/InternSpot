const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config();
const database=require("./config/database");
const cloudinary=require("./config/cloudinary");
const  cookieParser = require('cookie-parser');
const userRoutes=require("./routes/user");

const PORT=process.env.PORT||3000;

database.connect();

cloudinary.cloudinaryConnect();

app.use(cookieParser());

//sertting up the routes
app.use("/api/v1/auth", userRoutes);

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
