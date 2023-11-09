const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/(www\.)?[\da-zA-Z-]+\.[\w-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports.regex = regex;

module.exports.loginIsValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.registerIsValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    about: Joi.string().min(2).max(30),
  }),
});
module.exports.userIdIsValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});
module.exports.avatarIsValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});
module.exports.newUserDataIsValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
module.exports.cardIsValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regex),
  }),
});
module.exports.cardIdIsValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});
