const router = require("express").Router();

const db = require("../../models");

router.get("/", async (req, res) => {
    console.log("api/workouts");

});

module.exports = router;