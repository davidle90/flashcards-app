const { Category, Flashcard } = require('../models');

const index = async (req, res) => {
    try {
        const flashcards = await Flashcard.findAll({
            include: Category
        });
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const flashcard = await Flashcard.create(req.body);
        res.status(201).json(flashcard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const view = async (req, res) => {
    try {
        const flashcard = await Flashcard.findByPk(req.params.id, {
            include: Category
        });
        if (!flashcard) return res.status(404).json({ error: 'Flashcard not found' });
        res.json(flashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const edit = async (req, res) => {
    try {
        const [updated] = await Flashcard.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedFlashcard = await Flashcard.findByPk(req.params.id);
            res.json(updatedFlashcard);
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const deleted = await Flashcard.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Flashcard deleted' });
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    index,
    create,
    view,
    edit,
    destroy
};
