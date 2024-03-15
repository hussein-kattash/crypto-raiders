const express = require("express")
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require("cors");

require("dotenv").config();
const mongoString = process.env.MONGO_URL;

const app = express();

// Enable CORS for all routes
app.use(cors());

// middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// connect with monogdb
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// routes
app.use('/api', routes)


// listenning
const port = 5000;
app.listen(port,()=>{
    console.log(`My app listening on port ${port}`)
})