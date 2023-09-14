// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});

// Check if the model already exists before defining it
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

module.exports = Event;
