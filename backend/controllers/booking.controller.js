import Booking from "../models/booking.model.js";

const TOTAL_TABLES = 10;


export const createBooking = async (req, res) => {
  try {
    const { name, email, contact, persons, date, time, specialRequest } = req.body;

    if (!name || !email || !contact ||!persons || !date || !time || !specialRequest) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Booking.find({ date, time });
    
    if (existing.length >= TOTAL_TABLES) {
      return res.status(400).json({ message: "No table available" });
    }

    const bookedNumbers = existing.map(b => b.tableNumber);
    let tableNo = null;

    for (let i = 1; i <= TOTAL_TABLES; i++) {
      if (!bookedNumbers.includes(i)) {
        tableNo = i;
        break;
      }
    }

    const booking = await Booking.create({
      name, email,contact, persons, date, time, specialRequest, tableNumber: tableNo
    });

    res.status(201).json({ message: "Table booked", booking });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// READ SINGLE
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE BOOKING
export const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Updated", booking: updated });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
