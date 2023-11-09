const express = require('express');
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardIdIsValid, cardIsValid } = require('../middlewares/validation');

const router = express.Router();

router.get('/', getAllCards);
router.post('/', express.json(), cardIsValid, createCard);
router.delete('/:cardId', cardIdIsValid, deleteCardById);
router.put('/:cardId/likes', cardIdIsValid, likeCard);
router.delete('/:cardId/likes', cardIdIsValid, dislikeCard);

module.exports = router;
