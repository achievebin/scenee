import express from 'express';
import { postInquiry } from '../controllers/contactController.js';

const router = express.Router();
// POST /api/contact
router.post('/', postInquiry);

export default router;
