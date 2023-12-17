const FlashCard = require('../model/flash');


exports.createSet = async (req, res) => {
    try {
        
        const userId = req.user.userId
        const { setName, cards } = req.body;

        const newCards = cards.map(({ front, back }) => ({
            front,
            back
        }));

        const newSet = new Quiz({
            userId,
            setName,
            cards: newCards
        });

        // Save the new quiz to the database
        await newSet.save();
        
        res.status(201).json(newSet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
