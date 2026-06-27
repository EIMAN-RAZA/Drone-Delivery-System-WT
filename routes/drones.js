const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Drone = require('../models/Drone');


router.get('/', auth, async (req, res) => {
  try {
    const drones = await Drone.find().sort({ droneId: 1 });
    res.json(drones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;