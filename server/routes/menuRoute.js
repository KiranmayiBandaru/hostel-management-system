module.exports = router;
const express = require('express')
const router = express.Router()

const { addMenu, getMenu } = require('../controllers/menuController')
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware')

router.post('/addMenu', authMiddleware, authorizeRoles('superadmin'), addMenu)
router.get('/getMenu', getMenu)

module.exports = router