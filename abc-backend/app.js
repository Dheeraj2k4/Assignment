import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import eventsRouter from './routes/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://tdheerajsb:yOiG7PF8yygVQGzc@assignmentdb.i8anzlg.mongodb.net/eventsdb?retryWrites=true&w=majority&appName=AssignmentDB');

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
export const upload = multer({ storage });

// Routes
app.use('/', indexRouter);
app.use('/api/events', eventsRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Event routes will be added soon

export default app;
