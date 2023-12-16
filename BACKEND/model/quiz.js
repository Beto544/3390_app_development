const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizName: {
        type: String,
        required: true
    },
    
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            options: [
                {
                    type: [String],
                    required: true
                }
            ],
            answerIndex: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Quiz',quizSchema)