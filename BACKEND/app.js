const express = require('express')
require('dotenv').config()
require('./db')

const app = express()
const userRouter = require('./routes/user')
const quizRouter = require('./routes/quiz')
const setRouter = require('./routes/flash')
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/set',setRouter)


app.listen(PORT, () => {
    console.log(PORT)
})

