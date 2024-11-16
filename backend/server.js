const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8081

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}`);
})