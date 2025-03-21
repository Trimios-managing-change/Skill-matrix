const userSchema= require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
}
const existingUser = await userSchema.findOne({ email });
if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
}
  const user = new userSchema({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  if (await user.save()) {
    res.status(201).json({ message: "User created successfully" });}

}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) return res.status(400).send('Email not found');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');
    res.send('Logged in');
    }

module.exports = { register, login };