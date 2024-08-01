import { Router } from 'express';
import zapierController from '../modules/zapier/controller/zapierController';

const router: Router = Router();

router.get('/auth', zapierController.zapierAuth);
router.get('/auth-redirect-url', zapierController.zapierAuthCallback);

export default router;
