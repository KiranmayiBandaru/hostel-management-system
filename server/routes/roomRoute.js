const express = require('express')
const router = express.Router()

const { authMiddleware , authorizeRoles } = require('../middleware/authMiddleware')
const { createRoom } = require('../controllers/roomController')

router.post('/createRoom', authMiddleware, authorizeRoles('superadmin'), createRoom)

module.exports = router