const express = require('express');
const _ = require('lodash');
const models = require('../models');
const Promise = require('sequelize').Promise;

const router = express.Router();

// GET '/backendUniversalSearch/:searchWord' - Return the result of the search with the given search word
router.get('/:searchWord', (req, res) => {
  const notebooks = models.Notebook.findAll({
    where: {
      $or: [
        {
          title : { $like: '%' + req.params.searchWord + '%' }
        }
      ]
    }
  });

  const notes = models.Note.findAll({
    where: {
      $or: [
        {
          title : { $like: '%' + req.params.searchWord + '%' }
        },
        {
          content: { $like: '%' + req.params.searchWord + '%' }
        }
      ]
    }
  });

  Promise.all([notebooks, notes])
    .then(data => {
      let notebooks = data[0];
      let notes = data[1];
      res.json({notebooks, notes});
    });

});

module.exports = router;