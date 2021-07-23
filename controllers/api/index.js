const router = require('express').Router();

//require routes
const workoutRoutes = require('./workout-routes');


router.use("/workouts", workoutRoutes);

module.exports = router;
