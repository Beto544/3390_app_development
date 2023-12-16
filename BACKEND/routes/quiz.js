const router = require('express').Router()

const {createQuiz} = require("../controllers/quiz");
const {validateUser} = require("../middlewares/auth")
router.post('/createQuiz',validateUser,createQuiz)

module.exports = router;