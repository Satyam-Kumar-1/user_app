const express=require('express');
const app=express();
const cors=require('cors');
const path = require("path");
app.use(cors());
app.use(express.json());
app.use('/uploads/profile_image', express.static('uploads/profile_image'));
app.use('/uploads/images', express.static('uploads/images'));


app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
app.use('/user/api',require('./routes/userRoutes'));
app.use('/user/api/images',require('./routes/imageRoutes'));


PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})