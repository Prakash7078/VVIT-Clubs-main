const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const multer=require('multer');
const AdminRouter=require('./routes/adminRoutes');
const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
const msgRouter=require('./routes/msgRoutes');
const eventRouter=require('./routes/eventRoutes');
const clubRouter=require('./routes/clubRoutes');
const connectDB=require('./db/connectDB');
const app = express();
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB in bytes
  },
});
app.use(cors());
app.use(express.json());

app.use("/api/auth",upload.single("image"), authRouter);
app.use("/api/admin",upload.single("image"), AdminRouter);
app.use("/api/users",userRouter);
app.use("/api/msgs",msgRouter);
app.use("/api/clubs",clubRouter);
app.use("/api/events",eventRouter);

const port = process.env.PORT || 5000;

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();