import express from 'express';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

// Event schema: heading + 4 cards (each with image)
const eventSchema = new mongoose.Schema({
  heading: { type: String, default: "Browse All Events" },
  cards: {
    type: [
      {
        image: { type: String, default: "" },
      },
    ],
    default: [
      { image: "" },
      { image: "" },
      { image: "" },
      { image: "" },
    ],
    validate: v => Array.isArray(v) && v.length === 4,
  },
});
const Event = mongoose.model('Event', eventSchema);

// POST /api/events: update heading and/or a specific card
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let event = await Event.findOne({});
    if (!event) {
      event = new Event();
    }
    // Update heading if provided
    if (req.body.heading) {
      event.heading = req.body.heading;
    }
    // Update a specific card if index is provided
    const idx = parseInt(req.body.index, 10);
    if (!isNaN(idx) && idx >= 0 && idx < 4) {
      if (req.file) {
        event.cards[idx].image = `/uploads/${req.file.filename}`;
      }
    }
    await event.save();
    res.status(201).json({ message: 'Event updated', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events: return heading and 4 cards
router.get('/', async (req, res) => {
  try {
    let event = await Event.findOne({});
    if (!event) {
      // Return default if not set
      event = new Event();
      await event.save();
    }
    res.json({ heading: event.heading, cards: event.cards });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 