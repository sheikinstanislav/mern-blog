import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if(isUsed) {
      return res.json({
        message: 'Username already used!',
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username, 
      password: hash,
    });

    await newUser.save();

    res.json({
      newUser,
      message: 'Done!',
    });

  } catch (error) {
    res.json({
      message: 'error',
    });
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) {
      return res.json({
        message: 'Not found.'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      return res.json({
        message: 'Wrong password.'
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      );

      res.json({
        token,
        user,
        message: 'User logged in',
      });

  } catch (error) {
    res.json({
      message: 'Login error',
    });
  }
}

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if(!user){
      return res.json({
        message: 'User not found',
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      );

      res.json({
        user,
        token,
      })
    
  } catch (error) {
    res.json({
      message: 'Error',
    });
  }
}