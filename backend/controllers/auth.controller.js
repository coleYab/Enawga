import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signUp = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword } = req.body;

    if (!fullName || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters long' });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      profilePic: '',
      bio: '',
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res, '1h');

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error('Error signing up controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const email = req.user?._json?.email;
    const rememberMe = req.query.rememberMe === 'true';

    if (!email) {
      return res
        .status(400)
        .json({ error: 'No email found in Google profile' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const tokenExpiration = rememberMe ? '7d' : '1h';
    generateTokenAndSetCookie(user._id, res, tokenExpiration);

    // Development redirect
    res.redirect('http://localhost:5173/');
  } catch (error) {
    console.error('Error in google login controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const rememberMe = req.query.rememberMe === 'true';

    const user = await User.findOne({ username });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const tokenExpiration = rememberMe ? '7d' : '1h';
    generateTokenAndSetCookie(user._id, res, tokenExpiration);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } catch (error) {
    console.error('Error in login controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error Logout controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
