const { createObjectID, getsSubmissionCollection } = require("../util/db");

/**
 * Get a single submission by ID
 * @param submissionID - Submission ID from request params
 * @returns Single submission object
 */
const getSubmission = async (req, res) => {
  try {
    const collection = await getsSubmissionCollection();

    const { submissionID } = req.params;
    const query = { _id: createObjectID(submissionID) };

    const submission = await collection.findOne(query);

    res.status(200).json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all submissions for a specific form
 * @param formID - Form ID from request params
 * @returns Array of submissions for the form
 */
const getSubmissions = async (req, res) => {
  try {
    const collection = await getsSubmissionCollection();

    const { formID } = req.params;
    const query = { formDocumentID: formID };

    const submissions = await collection.find(query).toArray();

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get total number of submissions for a form
 * @param formID - Form ID from request params
 * @returns Object containing submission count
 */
const getSubmissionCount = async (req, res) => {
  try {
    const collection = await getsSubmissionCollection();

    const { formID } = req.params;
    const query = { formDocumentID: formID };

    const submissionCount = await collection.countDocuments(query);

    res.status(200).json({ submissionCount });
  } catch (error) {
    console.error("Error fetching submission count:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update an existing submission
 * @param submissionID - Submission ID from request params
 * @param body - Updated submission data
 * @returns Success message
 */
const updateSubmission = async (req, res) => {
  try {
    const collection = await getsSubmissionCollection();

    const { submissionID } = req.params;
    const query = { _id: createObjectID(submissionID) };
    // remove _id from req.body to prevent updating it
    delete req.body._id;
    const update = { $set: req.body };

    await collection.updateOne(query, update);

    res.status(200).json({ message: "Submission updated successfully" });
  } catch (error) {
    console.error("Error updating submission:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new submission for a form
 * @param formID - Form ID from request params
 * @returns Created submission ID and success message
 */
const createSubmission = async (req, res) => {
  console.error("Creating submission");
  try {
    const collection = await getsSubmissionCollection();

    const { formID } = req.params;
    const submission = {
      formDocumentID: formID,
      isCompleted: false,
    };
    const result = await collection.insertOne(submission);

    res.status(201).json({
      message: "Submission created successfully",
      submissionId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a submission
 * @param submissionID - Submission ID from request params
 * @returns Success message
 */
const deleteSubmission = async (req, res) => {
  try {
    const collection = await getsSubmissionCollection();

    const { submissionID } = req.params;
    const query = { _id: createObjectID(submissionID) };

    await collection.deleteOne(query);

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSubmission,
  getSubmissions,
  getSubmissionCount,
  updateSubmission,
  createSubmission,
  deleteSubmission,
};
