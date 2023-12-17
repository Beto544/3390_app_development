const mongoose = require('mongoose');

const FlashCardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    setName: {
        type: String,
        required: true
    },
    
    card: [
        {
            front: {
                type: String,
                required: true
            },
            back: [
                {
                    type: String,
                    required: true
                }
            ],
        }
    ]
});

module.exports = mongoose.model('FlashCard',FlashCardSchema)