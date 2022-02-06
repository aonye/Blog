import express from 'express';
import mongoose from 'mongoose';
import passport from './passport.js';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import APIRouter from './routes/api/index.js';
import login from './routes/app/login.js';
import bodyParser from 'express';

//mongoose/mongoDB
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//const __dirname = path.resolve();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "..", "build", "index.html")));
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//app.use(cors());

//app.use(); // block paths to every API route until verified

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "oldpublic", "index.html"));
// });

app.use('/login', login);
app.use('/api', APIRouter.index);
app.use('/api/users', APIRouter.users);
app.use('/api/comments', APIRouter.comments);
app.use('/api/posts', APIRouter.posts);
app.use('/api/login', APIRouter.login);

app.listen(process.env.PORT, () => {
    console.log(`Server started at Port: ${process.env.PORT}`);
});