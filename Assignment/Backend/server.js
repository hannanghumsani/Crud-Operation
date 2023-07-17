const express = require('express');
const app = express();
const cors = require('cors');

const connectdb = require('./config/mongoConfig');

connectdb();
const Users = require('./Model/registerUserModel');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    console.log(users);
    res.json({message: true, user: users});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  const newuser = req.body;

  try {
    const email = newuser.email;
    const existingUser = await Users.findOne({email});

    if (existingUser) {
      console.log('User found:', existingUser);
      res.json({message: true, user: existingUser});
    } else {
      const user = new Users(newuser);
      await user.save();
      console.log('User saved successfully');
      res.json({message: false, user});
    }
  } catch (error) {
    console.log('Error saving user:', error);
    res.status(500).json({error: 'An error occurred'});
  }
});

app.post('/api/login', async (req, res) => {
  console.log(req.body);
  const newuser = req.body;

  try {
    const email = newuser.email;
    const password = newuser.password;
    const user = await Users.findOne({email, password});
    console.log(user);
    if (user) {
      console.log('User found:', user);
      res.json({message: false, user: user});
    } else {
      // const user = new Users(newuser);
      // await user.save();
      // console.log('User saved successfully');
      res.json({message: true, user});
    }
  } catch (error) {
    console.log('Error saving user:', error);
    res.status(500).json({error: 'An error occurred'});
  }
});

app.post('/api/edit', async (req, res) => {
  console.log(req.body);

  const updatedUser = req.body;
  try {
    const email = updatedUser.email;
    const existingUser = await Users.findOne({email});
    //   const existingUser = await Users.findOne({ email: updatedUser.email });

    if (existingUser._id.toString() !== updatedUser._id) {
      // Email is already in use by another user
      console.log('Email already in use');
      return res.json({message: 'Email already in use'});
    }

    const updatedUserData = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      password: updatedUser.password,
      confirmPassword: updatedUser.confirmPassword,
    };

    const updatedUserObj = await Users.findOneAndUpdate(
      {_id: updatedUser._id},
      updatedUserData,
      {new: true},
    );

    if (updatedUserObj) {
      console.log('User updated:', updatedUserObj);
      res.json({message: false, user: updatedUserObj});
    } else {
      res.status(404).json({message: true});
    }
  } catch (error) {
    console.log('Error updating user:', error);
    res.status(500).json({error: 'An error occurred'});
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (deletedUser) {
      console.log('User deleted:', deletedUser);
      res.json({message: 'User deleted successfully'});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.log('Error deleting user:', error);
    res.status(500).json({error: 'An error occurred'});
  }
});

app.listen(8080);
