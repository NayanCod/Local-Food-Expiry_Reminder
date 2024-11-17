const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes.js");
const itemRoutes = require("./routes/itemRoutes.js");

require('./scheduler.js');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8081

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}`);
})
