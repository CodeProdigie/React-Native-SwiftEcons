import { Router } from 'express';
import { createSecretKey } from '../controllers/secretKeyController';

const router = Router();

router.post('/create', createSecretKey);

export default router;
