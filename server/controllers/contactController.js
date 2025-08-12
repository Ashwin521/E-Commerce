const Contact = require("../models/Contact");
const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message received!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {submitContactForm};
