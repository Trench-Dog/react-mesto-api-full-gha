require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { loginIsValid, registerIsValid } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to MongoDB');
});

app.use(requestLogger);

app.use(cors());

app.use(helmet());

app.post('/signin', express.json(), loginIsValid, login);
app.post('/signup', express.json(), registerIsValid, createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', auth, (req, res, next) => next(new NotFoundError('Такой страницы не существует')));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
