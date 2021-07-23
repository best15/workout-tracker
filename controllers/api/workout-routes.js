const router = require("express").Router();

const db = require("../../models");

//Get all workouts
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

        res.status(200).json(allWorkouts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


//get api/workouts/range -- find last seven workouts
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
            { $sort: { day: -1 } }, //descending order

        ]).limit(7);

        res.status(200).json(pastSevenWorkouts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


//Create New Workout
router.post("/", async (req, res) => {

    try {
        const newWorkout = await db.Workout.create(req.body);

        res.json(newWorkout);

    } catch (error) {

        res.status(500).send(error);
    }

});

//Update Workout
router.put("/:id", async (req, res) => {

    try {
        const updateWorkout = await db.Workout.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    exercises: req.body,
                },
            },
        );

        res.json(updateWorkout);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

});


module.exports = router;