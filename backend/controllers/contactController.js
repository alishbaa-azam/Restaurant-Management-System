import Contact from "../models/contact.js";

// Create new contact/query
export const createContact = async (req, res) => {
  try {
    const { fullName, phone, email, address, dishName, query } = req.body;

    if (!fullName || !phone || !email || !query) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const newContact = await Contact.create({
      fullName,
      phone,
      email,
      address,
      dishName,
      query,
    });

    res.status(201).json({ message: "Query submitted successfully", newContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contacts (optional admin route)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
