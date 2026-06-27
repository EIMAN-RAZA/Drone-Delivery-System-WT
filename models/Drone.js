const mongoose = require('mongoose');


const DroneSchema = new mongoose.Schema({
  droneId: {
    type: String,
    required: true,
    unique: true
  },
  model: {
    type: String,
    required: true
  },
  batteryLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'charging', 'maintenance'],
    default: 'available'
  },
  maxWeight: {
    type: Number,
    required: true  // in kg
  }
}, { timestamps: true });


module.exports = mongoose.model('Drone', DroneSchema);