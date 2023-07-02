const {Contact} = require("../models/contact");
const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20, favorite} = req.query;
  const parameters = favorite ? {owner, favorite} : {owner};
  const skip = (page - 1) * limit;
  const list = await Contact.find(parameters, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(list);
};

const getById = async (req, res) => {
  const {contactId} = req.params;
  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.json(oneContact);
};

const add = async (req, res) => {
  const {_id: owner} = req.user;
  const newContact = await Contact.create({...req.body, owner});
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const {contactId} = req.params;
  const deleteContact = await Contact.findByIdAndRemove(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const updateById = async (req, res) => {
  const {contactId} = req.params;
  const updateOneContact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {new: true}
  );
  if (!updateOneContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updateOneContact);
};

const updateFavorite = async (req, res) => {
  const {contactId} = req.params;
  const updateStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {new: true}
  );
  if (!updateStatusContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updateStatusContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
