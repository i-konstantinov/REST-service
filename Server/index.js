const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');

start();

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/furnitureREST', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Database connected');
    } catch (err) {
        console.error("Database connection error");
        process.exit(1);
    }
    
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational'});
    });

    app.listen(3030, () => console.log("REST service started on port 3030"));
}