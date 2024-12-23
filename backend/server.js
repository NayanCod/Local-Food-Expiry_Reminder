const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes.js");
const itemRoutes = require("./routes/itemRoutes.js");
const notifyRoute = require("./routes/notifyRoute.js");

require('./scheduler.js');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8081

// For prod (for dev comment it)
const corsOptions = {
    origin: 'https://local-food-expiry-reminder-frontend.onrender.com',  // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/notification', notifyRoute);

app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}`);
})
