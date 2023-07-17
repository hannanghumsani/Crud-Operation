const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const connectdb = require('./config/mongoConfig');

connectdb();
const Users = require('./Model/registerUserModel');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
secret = "normal"


const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,

  };
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
};


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

app.get('/api/users', verifyToken, async (req, res) => {
  const users = await Users.find();
  console.log(users);
  res.json({ message: true, user: users });
});

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  const newuser = req.body;

  try {
    const email = newuser.email;
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      console.log('User found:', existingUser);
      res.json({ message: true, user: existingUser });
    } else {
      const user = new Users(newuser);
      await user.save();
      console.log('User saved successfully');
      const token = generateToken(user);
      res.json({ message: false, user, token });
    }
  } catch (error) {
    console.log('Error saving user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/login', async (req, res) => {
  console.log(req.body);
  const newuser = req.body;

  try {
    const email = newuser.email;
    const password = newuser.password;
    const user = await Users.findOne({ email, password });
    console.log(user);
    if (user) {
      console.log('User found:', user);
      const token = generateToken(user);
      res.json({ message: false, user, token });
    } else {
      // const user = new Users(newuser);
      // await user.save();
      // console.log('User saved successfully');
      res.json({ message: true, user });
    }
  } catch (error) {
    console.log('Error saving user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/edit', verifyToken, async (req, res) => {
  console.log(req.body);

  const updatedUser = req.body;
  try {
    const email = updatedUser.email;
    const existingUser = await Users.findOne({ email });

    if (existingUser._id.toString() !== updatedUser._id) {
      console.log('Email already in use');
      return res.json({ message: 'Email already in use' });
    }

    const updatedUserData = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      password: updatedUser.password,
      confirmPassword: updatedUser.confirmPassword,
    };

    const updatedUserObj = await Users.findOneAndUpdate(
      { _id: updatedUser._id },
      updatedUserData,
      { new: true }
    );

    if (updatedUserObj) {
      console.log('User updated:', updatedUserObj);
      res.json({ message: false, user: updatedUserObj });
    } else {
      res.status(404).json({ message: true });
    }
  } catch (error) {
    console.log('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(8080);
