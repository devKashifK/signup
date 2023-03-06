
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const uri = 'mongodb+srv://devKashifK:Reactislove9852@cluster0.bx3sext.mongodb.net/db?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age : String,
  dob : String,
  gender : String,
  number : String
});

const User = mongoose.model('User', userSchema);





app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Password incorrect' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/updateProfile', async (req, res) => {
    try {
      const { email, age, dob, gender, number } = req.body;
      console.log(email)
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.age = age;
      user.dob = dob;
      user.gender = gender;
      user.number = number;
      await user.save();
      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post('/signup', async (req, res) => {
    const { name, email, password,  } = req.body;
  
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
  
  
   
  
    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();
  
    return res.status(201).json({ message: 'User created successfully' });
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));