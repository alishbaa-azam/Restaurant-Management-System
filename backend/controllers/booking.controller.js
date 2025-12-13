// import Booking from '../models/booking.model.js';
// // CREATE booking
// export const createBooking = async (req, res) => {
//   try {
//     const booking = await Booking.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully and confirmation email sent',
//       booking
//     });
   
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

import Booking from '../models/booking.model.js';
import { sendBookingConfirmationEmail } from '../utils/emailService.js';  // adjust path as needed

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    // Send confirmation email asynchronously
    sendBookingConfirmationEmail(booking)
      .then(info => {
        console.log('Email sent:', info.response);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully and confirmation email sent',
      booking,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// READ single booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid booking ID'
    });
  }
};

// UPDATE booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid booking ID'
    });
  }
};
