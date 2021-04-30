// root route
const router = require('express').Router();
const path = require('path');
const mongojs = require('mongojs');
// const db = require('../../models');
const { Workout } = require('../../models/index.js');

// router.get('/', (req, res) => {
//     res.sendFile(path.join(_dirname, "../public/index.html"))
// });

// get all workouts
router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// get one workout
router.get("/api/workouts/:id", (req, res) => {
    Workout.findOne(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
});

// post a workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// update a workout
router.put("/api/workouts/:id", (req, res) => {
    Workout.update(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $push: {
                exercises: req.body
            }
        },
        (error, data) => {
            if (error) {
                res.send(error);
            }   else    {
                res.send(data);
            }
        }
    )
});

// get the range
router.get('api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                }
            }
        }
    ])
    .sort({ _id: -1})
    .limit(7)
    .then((dbWorkouts) => {
        res.json(dbWorkouts);
    })
    .catch((err) => {
        res.json(err)
    })
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

