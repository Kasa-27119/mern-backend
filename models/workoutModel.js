// model and schema for workout data
// 1. bring mongoose
const mongoose = require('mongoose')

// 2. set up a const of the schema
const Schema = mongoose.Schema

// 3. define the schema for the model
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
},  {timestamps: true})

// 4. do module export to be able to share the model 
module.exports = mongoose.model('Workout', workoutSchema); // have a model called workout, and want to use workoutSchema for the model
