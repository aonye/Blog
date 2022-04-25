import express from 'express';
import mongoose from 'mongoose';
import passport from './passport.js';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import APIRouter from './routes/api/index.js';
import login from './routes/app/login.js';
// import auth from './routes/app/auth.js';
import bodyParser from 'body-parser';

// mongoose/mongoDB
mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const __dirname = path.resolve();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './build')));

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true, // access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// app.use(express.static(path.join(__dirname, "..", "build", "index.html")));
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());

// app.use(); // block paths to every API route until verified

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "oldpublic", "index.html"));
// });

app.use('/login', login);
app.use('/api', APIRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server started at Port: ${process.env.PORT}`);
});
