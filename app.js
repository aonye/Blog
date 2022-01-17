import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import APIRouter from './routes/api/index.js';
import path from 'path';

//mongoose/mongoDB
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const __dirname = path.resolve();

const app = express();

// app.use(express.static(path.join(__dirname, "..", "build", "index.html")));
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//app.use(cors());

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "oldpublic", "index.html"));
// });

//console.log(APIRouter, 'sdfsd');

app.use('/api/users', APIRouter.users);
app.use('/api/comments', APIRouter.comments);
app.use('/api/posts', APIRouter.posts);

app.listen(process.env.PORT, () => {
    console.log(`Server started at Port: ${process.env.PORT}`);
});