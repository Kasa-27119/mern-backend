// 1. import workout model
const workoutModel = require('../models/workoutModel')
const Workout =  require('../models/workoutModel')

// 2. import mongoose
const mongoose = require('mongoose')

// 3. define workout entries - route to GET ALL workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: - 1})
    res.status(200).json(workouts)

    // go to workout coll. + and find every workout, and give to me as var of workouts
    // i want to sort them a sorted list,so i can see the latest first, use sort 
    // using workout model to find every workout then sorting by creation date
    // making them into vars, then return workouts out as json data
}

// 6. GET SINGLE workout controller
const getWorkout = async (req,res) => {
    // get id
    const {id} = req.params

    // check if id is valid MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // try to find a workout by its id
    const workout = await Workout.findById(id)

    // no workout found - show an error
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    // otherwise return the single workout
    res.status(200).json(workout)

}

// 3b. CREATE workout controller
const createWorkout = async (req,res) => {
    // create req body
    const {title, load, reps} = req.body

    // add doc to DB - promise, so try and catch
    try {
        const workout = await Workout.create({title, load, reps})
        // expecting title load and rep values when creating a new post
        res.status(200).json(workout)
        // set status to ok and send new workout as json data
    }
    catch(error) {
        res.status(400).json({error: error.message})
        // status is an error and send json data as the error message
    }
}

// 5. DELETE workout controller
const deleteWorkout = async (req,res) => {
    // get id from req. params
    const {id} = req.params

    // checking valid id - if isn't valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.return(404).json({error: 'No such workout'})
    }

    // if it is valid - find and delete post using id
    const workout = await Workout.findOneAndDelete({_id: id})
    // the mongo id  is equal to the id from the request params above

    // if id is valid, but no workout found
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    // if it successfully find and deletes
    res.status(200).json(workout + ' successfully deleted')
}

// 7. UPDATE workout
const updateWorkout = async (req,res) => {
    // get workout id
    const {id} = req.params

    // check if MongoDb id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // find a workout by its id 
    // if it finds it, then 
    // spread out the properties of the workout
    // ask it to edit/change what it receives to change
    // - that comes from the req. body
    // eg. rep, load, or reps
    const workout = await Workout.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        // return only the updated post
        {new : true}
    )

    // if there is no workout
    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    // return updated workout
    res.status(200).json(workout)
}

// 4. final - object export all workouts functions
module.exports = {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout}