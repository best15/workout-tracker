const router = require("express").Router();
const path = require('path');

// render stats html page
router.get("/stats", (req, res) => {

    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

//render exercise html page
router.get("/exercise", (req, res) => {

    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;