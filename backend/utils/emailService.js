// emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or your SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send booking confirmation email
 * @param {Object} booking - Booking object with details
 */
export const sendBookingConfirmationEmail = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Table Booking Confirmation at Foodies Restaurant',
    text: `Dear ${booking.name},

Thank you for your booking at our restaurant.

Booking details:
- Date: ${booking.date}
- Time: ${booking.time}
- Number of Guests: ${booking.numberOfGuests}
- Table Type: ${booking.tableType || 'N/A'}

We look forward to serving you.

Best regards,
Foodies Restaurant Team`,
  };

  return transporter.sendMail(mailOptions);
};
