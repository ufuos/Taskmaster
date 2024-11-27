require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const port = 5500;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

// Database Connection
mongoose
     .connect(process.env.MONGO_URI, {useNewURLparser: true, useUnifiedTopology: true})
     .then(() => console.log('MongoDB connected'))
     .catch((err) => console.log(err));
     
     // Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks',taskRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message: 'Something went wrong!'});
});


const PORT = process.env.PORT ||5500;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));


