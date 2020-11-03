const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

function noteFilter(obj) {
  return _.pick(obj, ['title', 'content', 'notebookId']);
}

/* *** TODO: Fill in the API endpoints for notes *** */
// GET /notes - Returns a list of all notes.
router.get('/', (req, res) => {
    models.Note.findAll({ order: [['createdAt', 'DESC']] })
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json({ error: err.message }));
});

// POST /notes - Creates a new note using the posted data. The notebookId attribute shall specify which notebook it belongs to. Returns the new note.
router.post('/', (req, res) => {
  models.Note.create(noteFilter(req.body))
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET /notes/:noteId - Returns a single note by ID.
router.get('/:noteId', (req, res) => {
  models.Note.findAll({
    attributes: ['id', 'title', 'content'],
    order: [['createdAt', 'DESC']],
    where: { id: req.params.noteId }
  })
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /notes/:noteId - Deletes a single note by ID. Returns an empty object, {}.
router.delete('/:noteId', (req, res) => {
  models.Note.destroy({
    where : { id: req.params.noteId }
  })
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));

});

// PUT /notes/:noteId - Updates the attributes of a particular note. Returns the updated note.
router.put('/:noteId', (req, res) => {
  // Update the specified post record in the database
  models.Note.findById(req.params.noteId)
    .then(note => note.update(noteFilter(req.body)))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;
