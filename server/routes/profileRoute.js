import express from 'express';
import { createProfile, getProfile, updateProfile} from '../controllers/profileControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router=express.Router();

router.get('/',authMiddleware,getProfile);
router.post('/',authMiddleware,createProfile);
router.put('/:id',authMiddleware,updateProfile);
export default router;