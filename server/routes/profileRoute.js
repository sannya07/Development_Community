import express from 'express';
import { createProfile, getProfile } from '../controllers/profileControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router=express.Router();

router.get('/',authMiddleware,getProfile);
router.post('/',authMiddleware,createProfile);

export default router;