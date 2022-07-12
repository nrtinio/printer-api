import express from 'express';

import { GetSettings } from '../controllers/setting';

const router = express.Router();

router.post('/getsettings/', GetSettings);

export default router;