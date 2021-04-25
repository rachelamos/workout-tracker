// root route
const router = require('express').Router();
const path = require('path');

// router.get('/', (req, res) => {
//     res.sendFile(path.join(_dirname, "../public/index.html"))
// });
router.get("/api/workouts", ({body}, res) => {
    
});

router.post("/api/workouts", ({body}, res) => {

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

