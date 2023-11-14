const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const BadAuthErr = require('../errors/BadAuthErr');
const ExistingEmailErr = require('../errors/ExistingEmailErr');
const NotExistErr = require('../errors/NotExistErr');
const BadRequestErr = require('../errors/BadRequestErr');

const ROUND = 10;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, SECRET } = process.env;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET : 'verysecretkey', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: '604800',
        })
        .status(200)
        .send({ message: 'Авторизация прошла успешно' });
    })

    .catch(() => {
      next(new BadAuthErr('Неправильные почта или пароль.'));
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotExistErr('Пользователь по указанному не найден.'));
      }
      return res.status(200).send({ user });
    })
    .catch((err) => next(err));
};

const postUsers = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, ROUND)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name, about: user.about, avatar: user.avatar, _id: user._id, email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new ExistingEmailErr('Передан уже зарегистрированный email.'));
      }
      return next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        throw new NotExistErr('Ошибка. Пользователь не найден, попробуйте еще раз');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Ошибка. Введен некорректный id пользователя'));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotExistErr('Пользователь по указанному _id не найден.'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы некорректные данные при обновлении пользователя'));
      }
      return next(err);
    });
};

const patchMeAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotExistErr('Пользователь по указанному _id не найден.'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы некорректные данные при обновлении пользователя'));
      }
      if (err.name === 'CastError') {
        return next(new NotExistErr('Пользователь по указанному _id не найден.'));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  postUsers,
  updateUserProfile,
  patchMeAvatar,
  login,
  logout,
};
