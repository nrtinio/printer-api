// const express = require('express');

// const UserController = require('../controllers/user');
// const checkAuth = require('../middleware/check-auth');
import express from 'express';

import UserController from '../controllers/user';
import { CheckAuth } from '../middleware/check-auth';

const router = express.Router();

router.post('/signup', UserController.CreateUser);

router.post('/login', UserController.Login);

router.post('/getusers', UserController.GetUsersSearch);

router.post('/getuserscount', UserController.GetUsersSearchCount);

router.post('/changepassword', UserController.ChangePassword);

router.post('/resetpassword', UserController.ResetPassword);

router.post('/updateuser', CheckAuth, UserController.UpdateUser);


export default router;
