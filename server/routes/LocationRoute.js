import express from 'express';
import { saveLocation, getAllLocation, deleteLocation, getLocation } from '../controllers/LocationController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';
const router = express.Router();

router.post('/save', saveLocation);
router.get('/:id', getAllLocation);
router.get('/info/:id', getLocation);
router.delete('/:id', deleteLocation);

export default router;
