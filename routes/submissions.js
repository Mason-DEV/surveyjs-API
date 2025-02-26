const express = require("express");
const router = express.Router();
const {
  getSubmission,
  createSubmission,
  getSubmissionCount,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
} = require("../controllers/submissions");
getSubmissionCount;

router.get("/getbysubmissionID/:submissionID", getSubmission);
router.get("/getbyformID/:formID", getSubmissions);
router.get("/count/:formID", getSubmissionCount);
router.post("/update/:submissionID", updateSubmission);
router.post("/create/:formID", createSubmission);
router.delete("/:submissionID", deleteSubmission);

module.exports = router;
