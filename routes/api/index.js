// root route
const router = require('express').Router();
const path = require('path');
const { Workout } = require('../../models');

// router.get('/', (req, res) => {
//     res.sendFile(path.join(_dirname, "../public/index.html"))
// });
router.get("/api/workouts", ({body}, res) => {
    Workout.find({}) && Workout.aggregate([
        {
            $addFields: {
                
            }
        }
    ])
});

router.post("/api/workouts", ({body}, res) => {
    Workout.find({})
});
// get all workouts
// get api/workouts
// post api/workouts
// get one workout
// api/workouts/:id
// get ...?
// api/workouts/range
// exercise

// router.get('/exercise', (req, res) => {
//     res.sendFile(path.join(_dirname, "../public/exercise.html"))
// });

module.exports = router;

