import express from 'express';
import { submitContact } from '../controllers/contact.controller.js';

const router = express.Router();

// Public: Submit contact form (no auth required)
router.post('/', submitContact);

export default router;
