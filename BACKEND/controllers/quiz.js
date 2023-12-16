const Quiz = require('../model/quiz');


exports.createQuiz = async (req, res) => {
    try {
        
        const userId = req.user.userId
        const { quizName, questions } = req.body;

        const newQuestions = questions.map(({ question, options, answerIndex }) => ({
            question,
            options,
            answerIndex
        }));

        const newQuiz = new Quiz({
            userId,
            quizName,
            questions: newQuestions
        });

        // Save the new quiz to the database
        await newQuiz.save();
        
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
