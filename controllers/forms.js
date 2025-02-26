const { getFormsCollection, createObjectID } = require("../util/db");

// Controller functions
/**
 * Get all forms from the database
 * @returns Array of all forms
 */
const getAllForms = async (req, res) => {
  try {
    const collection = await getFormsCollection();

    const forms = await collection.find({}).toArray();

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: error.message });
  }
};
/**
 * Get a single form by ID
 * @param id - Form ID from request params
 * @returns Single form object
 */
const getForm = async (req, res) => {
  try {
    const collection = await getFormsCollection();

    const { id } = req.params;
    const query = { _id: createObjectID(id) };

    const forms = await collection.findOne(query);

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new form
 * @param none
 * @returns Newly created form
 */
const createForm = async (req, res) => {
  try {
    const collection = await getFormsCollection();

    const form = { title: "New Submission Form" };
    const result = await collection.insertOne(form);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update an existing form
 * @param id - Form ID from request params
 * @param body - Updated form data
 * @returns Updated form
 */
const updateForm = async (req, res) => {
  try {
    const collection = await getFormsCollection();

    const { id } = req.params;
    const query = { _id: createObjectID(id) };
    const form = req.body;

    const result = await collection.updateOne(query, { $set: form });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a form
 * @param id - Form ID from request params
 * @returns No content on success
 */
const deleteForm = async (req, res) => {
  try {
    const collection = await getFormsCollection();

    const { id } = req.params;
    const query = { _id: createObjectID(id) };

    const result = await collection.deleteOne(query);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
};
