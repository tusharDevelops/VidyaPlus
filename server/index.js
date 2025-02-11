const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//^importing routes
const courseRoutes = require("./routes/Course")
const paymentRoutes = require("./routes/Payments")
const profileRoutes = require("./routes/Profile")
const userRoutes = require("./routes/User")
const contactUsRoutes = require("./routes/Contact")
const notesRoutes = require("./routes/Notes")

//^importing configs

const {dbConnect} = require("./configs/database");
const {cloudinaryConnect} = require("./configs/cloudinary");

//^impoting middlewares
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//^ using middlewares
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));


//^ connecting Cloud and mongo db (atlas)
dbConnect();
cloudinaryConnect();

//^ url mounting for paths
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoutes);
app.use("/api/v1/notes", notesRoutes);

//default route for this port

app.get("/", (req,res)=>{
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
})

//&erver  activation
app.listen(process.env.PORT, (req,res)=>{
    console.log(`App is running at ${process.env.PORT}`)
})
