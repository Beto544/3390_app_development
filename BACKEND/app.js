const express = require('express')
require('dotenv').config()
require('./db')
const cors = require('cors');
const app = express()
const userRouter = require('./routes/user')
const quizRouter = require('./routes/quiz')
const setRouter = require('./routes/flash')
const PORT = process.env.PORT || 8000
const verifyToken = require('./middlewares/verify');
const Quiz = require('./model/quiz');
const FlashCard = require('./model/flash'); 
app.listen(PORT, () => {
    console.log(PORT)
})
app.use(cors());
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/set',setRouter)



app.get('/api/quiz', async (req, res) => {
    try {
      
      // Assuming req.user.userId contains the user's ID from the token
      const quizzes = await Quiz.find({ userId: req.query.userId });
      res.json(quizzes);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
  // API endpoint to get flashcards
  app.get('/api/flashcards', async (req, res) => {
    try {
      // Assuming req.user.userId contains the user's ID from the token
      const flashcards = await FlashCard.find({ userId: req.query.userId });
      res.json(flashcards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

