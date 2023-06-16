const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody} = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateById);

module.exports = router;

// const express = require("express");
// const Joi = require("joi");

// const contacts = require("../../models/contacts");

// const {HttpError} = require("../../helpers");

// const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.number().required(),
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const list = await contacts.listContacts();
//     res.json(list);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const {contactId} = req.params;
//     const oneContact = await contacts.getContactById(contactId);
//     if (!oneContact) {
//       throw HttpError(404, "Not found");
//       // const error = new Error("Not found");
//       // error.status = 404;
//       // throw error;
//       // return res.status(404).json({
//       //   message: "Not found",
//       // });
//     }
//     res.json(oneContact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const {error} = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }

//     const newContact = await contacts.addContact(req.body);
//     res.status(201).json(newContact);

//     // const newContact = await contacts.addContact({name, email, phone});
//     // res.json(newContact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const {contactId} = req.params;
//     const deleteContact = await contacts.removeContact(contactId);
//     if (!deleteContact) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({
//       message: "Delete success",
//     });
//     // res.json(deleteContact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const {error} = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const {contactId} = req.params;
//     const updateOneContact = await contacts.updateContact(contactId, req.body);
//     if (!updateOneContact) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(updateOneContact);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
