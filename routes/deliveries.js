const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Delivery = require('../models/Delivery');


router.post('/', auth, async (req, res) => {
  try {
    const {
      senderName,
      receiverName,
      pickupLocation,
      dropoffLocation,
      packageWeight,
      droneId,
      deliveryStatus
    } = req.body;
    const newDelivery = new Delivery({
      senderName,
      receiverName,
      pickupLocation,
      dropoffLocation,
      packageWeight,
      droneId,
      deliveryStatus,
      user: req.user.id   
    });
    const delivery = await newDelivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const deliveries = await Delivery.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/:id', auth, async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ msg: 'Delivery not found' });
    }
    if (delivery.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Delivery not found' });
    }
    res.status(500).send('Server error');
  }
});


router.put('/:id', auth, async (req, res) => {
  try {
    let delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ msg: 'Delivery not found' });
    }
    if (delivery.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const {
      senderName,
      receiverName,
      pickupLocation,
      dropoffLocation,
      packageWeight,
      droneId,
      deliveryStatus
    } = req.body;
    if (senderName) delivery.senderName = senderName;
    if (receiverName) delivery.receiverName = receiverName;
    if (pickupLocation) delivery.pickupLocation = pickupLocation;
    if (dropoffLocation) delivery.dropoffLocation = dropoffLocation;
    if (packageWeight) delivery.packageWeight = packageWeight;
    if (droneId) delivery.droneId = droneId;
    if (deliveryStatus) delivery.deliveryStatus = deliveryStatus;
    await delivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ msg: 'Delivery not found' });
    }
    if (delivery.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    await Delivery.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Delivery cancelled successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;