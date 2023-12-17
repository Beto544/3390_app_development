const router = require('express').Router()

const {createSet} = require("../controllers/flash");
const {validateUser} = require("../middlewares/auth")
router.post('/createSet',validateUser,createSet)

module.exports = router;