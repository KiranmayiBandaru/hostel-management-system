const express = require('express')
const router = express.Router()
const {authMiddleware , authorizeRoles} = require('../middlewares/authMiddleware')
const { createStudent , createAdmin} = require('../controllers/userController')

router.post('/createStudent', authMiddleware, authorizeRoles('admin' , 'superadmin'), createStudent)
router.post('/createAdmin', authMiddleware, authorizeRoles('superadmin'), createAdmin)

module.exports = router