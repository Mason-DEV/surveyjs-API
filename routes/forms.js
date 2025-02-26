const express = require("express");
const router = express.Router();
const {
  getAllForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
} = require("../controllers/forms");

router.get("/", getAllForms);
router.get("/:id", getForm);
router.post("/", createForm);
router.post("/:id", updateForm);
router.delete("/:id", deleteForm);

module.exports = router;
