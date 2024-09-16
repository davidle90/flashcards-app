const { Category, Flashcard } = require('../models');

const index = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: Flashcard
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const view = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: Flashcard
        });
        if(!category){
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const edit = async (req, res) => {
    try {
        const [updated] = await Category.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCategory = await Category.findByPk(req.params.id);
            res.json(updatedCategory);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const destroy = async (req, res) => {
    try {
        await Flashcard.destroy({
            where: { categoryId: req.params.id }
          });
          
        const deleted = await Category.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Category and its associated flashcards deleted' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    index,
    create,
    view,
    edit,
    destroy
};