const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const formRoutes = require('./routes/formRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', formRoutes);


// Initialize server
const server = async () => {
    try {
        await db();
        app.listen(PORT, () => {
            console.log('Server is running on port:', PORT);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

server();

module.exports = app;
