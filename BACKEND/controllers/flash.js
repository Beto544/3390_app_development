const FlashCard = require('../model/flash');


exports.createSet = async (req, res) => {
    try {
        
        const userId = req.user.userId
        const { setName, card } = req.body;
        console.log(req.body)
        const newCards = card.map(({ front, back }) => ({
            front,
            back
        }));

        const newSet = new FlashCard({
            userId,
            setName,
            cards: newCards
        });

        
        await newSet.save();
        
        res.status(201).json(newSet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
