const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      passwordHash: hashedPassword
    });

    // Generate token
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    });

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || user.isBanned) {
      return res.status(401).json({ error: 'Invalid credentials or user banned' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed', details: err.message });
  }
};
