const express = require('express');
const _ = require('lodash');
const models = require('../models');
const Promise = require('sequelize').Promise;

const router = express.Router();

// GET '/statistic' - Return the summary statistic information
router.get('/', (req, res) => {
  const notebookCount = models.Notebook.count();
  const noteCount = models.Note.count();
  const oldestNotebook = models.Notebook.findAll({
    order: [['createdAt', 'ASC']],
    limit: 1
  });
  const recentlyUpdatedNote = models.Note.findAll({
    order: [['updatedAt', 'DESC']],
    limit: 1
  });
  
  Promise.all([notebookCount, noteCount, oldestNotebook, recentlyUpdatedNote])
    .then(data => {
      let notebookCount = data[0];
      let noteCount = data[1];
      let oldestNotebook = data[2][0] == null ? '' : data[2][0].title;
      let recentlyUpdatedNote = data[3][0] == null ? '' : data[3][0].title;
      res.json({noteCount, notebookCount, oldestNotebook, recentlyUpdatedNote})
    });

});


module.exports = router;