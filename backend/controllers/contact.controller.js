import Contact from '../models/contact.model.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { fullName, phoneNumber, emailAddress, address, dishName, query } = req.body;

    // Validate required fields
    if (!fullName || !phoneNumber || !emailAddress || !query) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create new contact entry
    const contact = await Contact.create({
      fullName,
      phoneNumber,
      emailAddress,
      address: address || '',
      dishName: dishName || '',
      query
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      contact
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error submitting contact form' });
  }
};

// Get all contact submissions (admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching contacts' });
  }
};

// Get single contact
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching contact' });
  }
};

// Mark contact as read (admin)
export const markContactAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating contact' });
  }
};

// Delete contact (admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted', contact });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting contact' });
  }
};
