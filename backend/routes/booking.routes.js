// import express from 'express';
// import { body, param, query } from 'express-validator';
// import {
//   createBooking,
//   getAllBookings,
//   getBookingById,
//   updateBookingStatus,
//   cancelBooking,
//   getAvailableSlots
// } from '../controllers/booking.controller.js';

// const router = express.Router();

// // Validation middleware
// const validateBooking = [
//   body('name')
//     .trim()
//     .notEmpty().withMessage('Name is required')
//     .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  
//   body('email')
//     .trim()
//     .notEmpty().withMessage('Email is required')
//     .isEmail().withMessage('Please enter a valid email')
//     .normalizeEmail(),
  
//   body('phone')
//     .trim()
//     .notEmpty().withMessage('Phone number is required')
//     .matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please enter a valid phone number'),
  
//   body('date')
//     .notEmpty().withMessage('Date is required')
//     .isISO8601().withMessage('Please enter a valid date (YYYY-MM-DD)')
//     .custom(value => {
//       const date = new Date(value);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       return date >= today;
//     }).withMessage('Date cannot be in the past'),
  
//   body('time')
//     .notEmpty().withMessage('Time is required')
//     .isIn([
//       '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
//       '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
//     ]).withMessage('Please select a valid time slot'),
  
//   body('guests')
//     .notEmpty().withMessage('Number of guests is required')
//     .isInt({ min: 1, max: 20 }).withMessage('Guests must be between 1 and 20'),
  
//   body('tableType')
//     .optional()
//     .isIn(['indoor', 'outdoor', 'private', 'chef']).withMessage('Invalid table type'),
  
//   body('specialRequests')
//     .optional()
//     .isLength({ max: 500 }).withMessage('Special requests cannot exceed 500 characters')
//     .trim()
// ];

// // Routes
// router.post('/', validateBooking, createBooking);
// router.get('/', getAllBookings);
// router.get('/slots/:date', getAvailableSlots);
// router.get('/:bookingId', getBookingById);
// router.patch('/:bookingId/status', updateBookingStatus);
// router.delete('/:bookingId/cancel', cancelBooking);

// export default router;

import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
