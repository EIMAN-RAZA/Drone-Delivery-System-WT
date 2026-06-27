
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); 
const app = express();   


dotenv.config();
connectDB();

const Drone = require('./models/Drone');
const seedDrones = async () => {
  const count = await Drone.countDocuments();
  if (count === 0) {
    const sampleDrones = [
      { droneId: 'DR-101', model: 'Mavic Air 2', batteryLevel: 85, status: 'available', maxWeight: 2.5 },
      { droneId: 'DR-102', model: 'Phantom 4', batteryLevel: 92, status: 'busy', maxWeight: 3.0 },
      { droneId: 'DR-103', model: 'Inspire 2', batteryLevel: 45, status: 'charging', maxWeight: 5.0 },
      { droneId: 'DR-104', model: 'Anafi Thermal', batteryLevel: 100, status: 'available', maxWeight: 2.0 }
    ];
    await Drone.insertMany(sampleDrones);
    console.log('Drones seeded');
  }
};
seedDrones();

process.on('uncaughtException', (err) => {
  console.error('\x1b[31m%s\x1b[0m', 'UNCAUGHT EXCEPTION:');
  console.error(err.stack);
  process.exit(1);
});

app.use(cors());
app.use(express.json()); 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/deliveries', require('./routes/deliveries'));
app.use('/api/drones', require('./routes/drones'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running at http://localhost:${PORT}`));