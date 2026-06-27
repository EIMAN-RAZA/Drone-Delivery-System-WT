const mongoose = require('mongoose');


const DeliverySchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true
  },
  receiverName: {
    type: String,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropoffLocation: {
    type: String,
    required: true
  },
  packageWeight: {
    type: Number,
    required: true,
    min: 0.1
  },
  droneId: {
    type: String,
    required: true
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'in-progress', 'delivered', 'cancelled'],
    default: 'pending'
  },
  user: {                   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Delivery', DeliverySchema);