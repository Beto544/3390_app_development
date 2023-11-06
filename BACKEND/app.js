const express = require('express')
require('dotenv').config()
require('./db')

const app = express()
const userRouter = require('./routes/user')

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use('/api/user',userRouter)

app.listen(PORT, () => {
    console.log(PORT)
})