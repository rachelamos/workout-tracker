// root route
const router = require('express').Router();
const path = require('path');
const mongojs = require('mongojs');
const { Workout } = require('../../models/index.js');

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

// workout range
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

module.exports = router;

