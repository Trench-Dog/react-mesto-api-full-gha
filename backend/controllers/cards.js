const Card = require('../models/card');

const CREATED = 201;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED).send(card);
    }).catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};
module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            res.send(card);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send(card);
      else throw new NotFoundError('Карточка не найдена');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send(card);
      else throw new NotFoundError('Карточка не найдена');
    }).catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};
