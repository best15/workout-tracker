const express = require('express');
const mongoose = require('mongoose');

const routes = require('./controllers');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_tracker_db", { useNewUrlParser: true, useUnifiedTopology: true, });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});