import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect('mongodb://mo35226_Test:GrimTest12@mongo.ct8.pl/mo35226_Test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      keepAlive: true, // Keep sockets alive even when there's no activity
      keepAliveInitialDelay: 300000, // Wait 5m before sending keepalive packets
      retryWrites: true, // Retry writes if they fail due to network errors
      w: 'majority', // Ensure that writes are acknowledged across the replica set
    })
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.error(err);
    });
};

export default connect;
