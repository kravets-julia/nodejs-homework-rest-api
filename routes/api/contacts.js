const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const list = await contacts.listContacts();
  res.json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const oneContact = await contacts.getContactById(id);
  res.json(oneContact);
});

router.post("/", async (req, res, next) => {
  const newContact = await contacts.addContact({name, email, phone});
  res.json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const deleteContact = await contacts.removeContact(id);
  res.json(deleteContact);
});

router.put("/:contactId", async (req, res, next) => {
  const updateContact = await contacts.updateContact(id);
  res.json(updateContact);
});

module.exports = router;
