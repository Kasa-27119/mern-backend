// all the endpoints for our workouts

// 1. bring express
const express = require('express')

// 2. bring express router method
const router = express.Router();

// 2b. import the controller functions!!!
const {getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// 3. use router variable + http method to create a route
router.get('/', getWorkouts) // '/' route, getWorkouts controller, need to define in controllers

// 7. get a  single workout
router.get('/:id', getWorkout)

// 5. post workout route + attach create controller
router.post('/', createWorkout)

// 6. delete workout route + delete controller/method
router.delete('/:id', deleteWorkout)

// 8. update workout route + controller
router.patch('/:id', updateWorkout)

// 4. module export the router
module.exports = router;