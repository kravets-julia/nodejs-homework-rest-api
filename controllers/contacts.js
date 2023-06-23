const contacts = require("../models/contacts");

const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
  const list = await contacts.listContacts();
  res.json(list);
};

const getById = async (req, res) => {
  const {contactId} = req.params;
  const oneContact = await contacts.getContactById(contactId);
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.json(oneContact);
};

const add = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const {contactId} = req.params;
  const deleteContact = await contacts.removeContact(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const updateById = async (req, res) => {
  const {contactId} = req.params;
  const updateOneContact = await contacts.updateContact(contactId, req.body);
  if (!updateOneContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updateOneContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
