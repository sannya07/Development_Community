import express from 'express';
import { createProfile, getProfile } from '../controllers/profileControllers.js';

const router=express.Router();

router.get('/',getProfile);
router.post('/',createProfile);

export default router;