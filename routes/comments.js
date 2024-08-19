const express = require('express')
const router = express.Router()
const {
    createComment,
    editComment,
    deleteComment,
} = require('../controllers/commentController')

// create new comment for a specific workout
router.post('/workouts/:workoutId/comments', createComment)

// edit a comment
router.patch('/workouts/:workoutId/comments', editComment)

// delete a comment
router.delete('/workouts/:workoutId/comments', deleteComment)

module.exports = router