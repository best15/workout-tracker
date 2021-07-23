const router = require("express").Router();

const db = require("../../models");

router.get("/", async (req, res) => {


    try {

        const allWorkouts = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: `$exercises.duration`,
                    },
                },
            },
        ]);
        console.log("allWorkouts------", allWorkouts);
        res.status(200).json(allWorkouts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;