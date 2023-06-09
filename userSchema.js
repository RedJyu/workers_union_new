// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     default: uuidv4,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   passwordConfirmation: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
// });

// const usersDB = mongoose.connection.useDb('usersDB');
// const User = usersDB.model('User', userSchema);

// export default User;
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirmation: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
