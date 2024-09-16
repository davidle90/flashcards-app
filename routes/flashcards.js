const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const flashcardController = require('../controllers/flashcardController');

router.get('/', function(req, res) {
    res.send('Hello world!');
});

router.post('/flashcards', flashcardController.create);
router.get('/flashcards', flashcardController.index);
router.get('/flashcards/:id', flashcardController.view);
router.put('/flashcards/:id', flashcardController.edit);
router.delete('/flashcards/:id', flashcardController.destroy);

router.post('/categories', categoryController.create);
router.get('/categories', categoryController.index);
router.get('/categories/:id', categoryController.view);
router.put('/categories/:id', categoryController.edit);
router.delete('/categories/:id', categoryController.destroy);

module.exports = router;