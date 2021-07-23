const router = require("express").Router();
const path = require('path');


router.get("/stats", (req, res) => {
    console.log("statsssssss", __dirname);
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/exercise", (req, res) => {
    console.log("exercise", __dirname);
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;