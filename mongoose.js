// import mongoose from 'mongoose';

// let usersDB;
// let postsDB;

// const connect = () => {
//   usersDB = mongoose.createConnection(
//     'mongodb://mo35226_Users:GrimTest12@mongo.ct8.pl/mo35226_Users',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//       keepAlive: true,
//       keepAliveInitialDelay: 300000,
//       retryWrites: true,
//       w: 'majority',
//     }
//   );

//   usersDB.once('open', () => {
//     console.log('Users database connected');
//   });

//   usersDB.on('error', (err) => {
//     console.error('Users database connection error:', err);
//   });

//   postsDB = mongoose.createConnection(
//     'mongodb://mo35226_Posts:GrimPost12@mongo.ct8.pl/mo35226_Posts',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//       keepAlive: true,
//       keepAliveInitialDelay: 300000,
//       retryWrites: true,
//       w: 'majority',
//     }
//   );

//   postsDB.once('open', () => {
//     console.log('Posts database connected');
//   });

//   postsDB.on('error', (err) => {
//     console.error('Posts database connection error:', err);
//   });
// };

// export { mongoose, usersDB, postsDB, connect };
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
