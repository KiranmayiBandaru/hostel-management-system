const express = require('express')
const router = express.router
const {authMiddleware, authorizeRoles} = require('../middleware/authMiddleware')
const { createBlock } = require('../controllers/blockController')

router.post('/createBlock', authMiddleware, authorizeRoles('superadmin'), createBlock)

module.exports = { blockRouter }