const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const workoutSchema = new Schema({
    
   day: new Date(),

   exercises: [
       {
           type: String,
           //add trim and require to type and name
           name: String,
           duration: Number,
           weight: Number,
           reps: Number,
           sets: Number,
           distance: Number
       }
   ]
})

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;