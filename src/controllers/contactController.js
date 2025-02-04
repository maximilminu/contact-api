const contactService = require("../services/contactService");

const contactController = {
  getAll: (req, res) => {
    contactService
      .getAllContacts()
      .then((contacts) => {
        res.json(contacts);
      })
      .catch((error) => res.status(500).json({ ERROR: error.message }));
  },

  getById: (req, res) => {
    console.log("CONTACT id ", req.params.id);
    contactService
      .getContactById(req.params.id)
      .then((contact) => {
        if (!contact)
          return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
      })
      .catch((error) => res.status(500).json({ ERROR: error.message }));
  },

  getByLocation: (req, res) => {
    const location = req.params.location;
    console.log("location:", location);

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    contactService
      .getContactsByLocation(location)
      .then((contacts) => res.json(contacts))
      .catch((error) => res.status(500).json({ error: error.message }));
  },

  searchContact: (req, res) => {
    const query = req.params.query || "";
    console.log("SEARCH QUERY:", query);

    contactService
      .searchContacts(query)
      .then((contacts) => res.json(contacts))
      .catch((error) => res.status(500).json({ error: error.message }));
  },

  create: (req, res) => {
    contactService
      .createContact(req.body)
      .then((contact) => {
        console.log("CONTACT CREATE: ", contact);
        res.status(201).json(contact);
      })
      .catch((error) => res.status(400).json({ ERROR: error.message }));
  },

  update: (req, res) => {
    contactService
      .updateContact(req.params.id, req.body)
      .then((contact) => res.json(contact))
      .catch((error) => res.status(400).json({ ERROR: error.message }));
  },

  delete: (req, res) => {
    contactService
      .deleteContact(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => res.status(500).json({ ERROR: error.message }));
  },

  notify: (req, res) => {
    const { contactIds } = req.body;
    console.log("CONTACT IDs: ", contactIds)

    if (!contactIds || contactIds.length === 0) {
      return res.status(400).json({ error: "contactIds is required" });
    }
    
    let emailTemplate = "Congratulations <contact_name> Today you turn <age>! Best regards"

    contactService
      .notifyContacts(contactIds, emailTemplate)
      .then(() => res.status(200).json({ message: "Notifications sent successfully" }))
      .catch((error) => res.status(500).json({ error: error.message }));
  },

};

module.exports = contactController;
