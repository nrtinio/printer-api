// const express = require('express');
// const PrintController = require('../controllers/printer');
// const checkAuth = require('../middleware/check-auth');
import express from 'express';
import PrintController from '../controllers/printer';
import { CheckAuth } from '../middleware/check-auth';

const router = express.Router();

router.post('/push', CheckAuth, PrintController.Push)

export default router;