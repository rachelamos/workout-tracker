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
router.get('/workouts', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.get("/workouts/range", (req, res) => {
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
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
});

// get one workout
router.get("/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        {
            _id: req.params.id
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
router.post("/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// update a workout
router.put("/workouts/:id", (req, res) => {
    Workout.update(
        {
            _id: req.params.id
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
// router.get('/workouts/range', (req, res) => {
//     Workout.aggregate([
//         {
//             $addFields: {
//                 totalDuration: {
//                     $sum: '$exercises.duration',
//                 }
//             }
//         }
//     ])
//     .sort({ _id: -1})
//     .limit(7)
//     .then((dbWorkouts) => {
//         res.json(dbWorkouts);
//     })
//     .catch((err) => {
//         res.json(err)
//     })
// });

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

