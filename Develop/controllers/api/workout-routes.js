const router = require("express").Router();

const db = require("../../models");

//get api/workouts
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


//get aapi/workouts/range
router.get("/range", async (req, res) => {
    try {

        const pastSevenWorkouts = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: `$exercises.duration`,
                    },
                    combinedWeight: {
                        $sum: `exercises.weight`,
                    }
                },

            },
            { $sort: { day: -1 } },

        ]).limit(7);

        res.status(200).json(pastSevenWorkouts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


module.exports = router;