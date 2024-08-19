// all the endpoints for our workouts

// 1. bring express
const express = require('express')

// 2. bring express router method
const router = express.Router();

// multer js init
const multer = require('multer')
const path = require('path')

// configure multer storage
// where is multer storing these created files?
const storage = multer.diskStorage({
    // request, file, callback
    destination: (req, file, cb) => {
        cb(null, 'public/uploads') // stores uploads in the dir (backend)
    },
    // create a unique name for each img or unique suffix
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, uniqueSuffix + ext) // the unique fille name with img extension
    }
})

const upload = multer({storage}) // storing in uploads in public folder


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
router.post('/', upload.single('image'), createWorkout)

// 6. delete workout route + delete controller/method
router.delete('/:id', deleteWorkout)

// 8. update workout route + controller
router.patch('/:id', updateWorkout)

// 4. module export the router
module.exports = router;