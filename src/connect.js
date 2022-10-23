const mongoose = require('mongoose');

function connectDB() {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection;
  db.on('error', () => {
    console.log('MongoDB connection error!');
  });

  db.once('open', async () => {
    console.log('Connection to mongo!');
  });
}

module.exports = connectDB;
