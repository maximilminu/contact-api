const express = require('express');
const contactController = require("../controllers/contactController");
const withLogging = require('../utils/decorators');

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Contacts API is running');
});

router.get("/", contactController.getAll);
router.get("/by-location/:location", contactController.getByLocation);
router.get("/search/:query", contactController.searchContact);
router.get("/:id", withLogging(contactController.getById, "Contact Found"));


router.post("/", withLogging(contactController.create, "Contact created"));
router.post("/notify-contacts", withLogging(contactController.notify, "Contacts notified"));

router.put("/:id", withLogging(contactController.update, "Contact Updated"));

router.delete("/:id", withLogging(contactController.delete, "Contact Deleted"));



module.exports = router;