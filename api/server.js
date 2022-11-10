const express = require('express');

const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const mongoose = require("mongoose");

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

//db config
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // server
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Connectred to db & Listening to port ${PORT}`));
    })
    .catch((error) => {
        console.log(error)
    })

// routes
const todoRoutes = require('./routes/todo');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');


app.use('/api/v1/todo', todoRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/user', userRoutes);

