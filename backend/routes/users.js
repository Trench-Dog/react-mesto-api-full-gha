const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
  getMyInfo,
} = require('../controllers/users');
const { newUserDataIsValid, avatarIsValid, userIdIsValid } = require('../middlewares/validation');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', getMyInfo);
router.get('/:userId', userIdIsValid, getUserById);
router.patch('/me', express.json(), newUserDataIsValid, updateUserInfo);
router.patch('/me/avatar', express.json(), avatarIsValid, updateUserAvatar);

module.exports = router;
