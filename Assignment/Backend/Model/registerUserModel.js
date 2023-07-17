// const connectdb = require('./config/mongoConfig')
// connectdb()
const mongoose = require('mongoose');


// console.log(firstName, lastName, email, password, confirmPassword);
// const addone = ()=> 
// {
    const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirmPassword : String
});


const User = mongoose.model('User', userSchema);


// const user = new User({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'johndoe@example.com',
//   password: 'password123',
//   confirmPassword: 'password123'

// });

// Save the user to the database
// user.save()
//   .then(() => {
//     console.log('User saved successfully');
//   })
//   .catch((error) => {
//     console.log('Error saving user:', error);
//   });
// }
module.exports = User