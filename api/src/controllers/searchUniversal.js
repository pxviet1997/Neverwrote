const express = require('express');
const _ = require('lodash');
const models = require('../models');
const Promise = require('sequelize').Promise;

const router = express.Router();

router.get('/:searchedWord', (req, res) => {
  const notebooks = models.Notebook.findAll({
    where: {
      $or: [
        {
          title : {
            $like: '%' + req.params.searchedWord + '%'
          }
        }
      ]
    }
  });

  const notes = models.Note.findAll({
    where: {
      $or: [
        {
          title : {
            $like: '%' + req.params.searchedWord + '%'
          }
        },
        {
          content: {
            $like: '%' + req.params.searchedWord + '%'
          }
        }
      ]
    }
  });

  console.log('notes : ' + notes);

  // Promise.all([notebooks, notesTitle, notesContent])
  Promise.all([notebooks, notes])
  .then(data => {
      let notebooks = data[0];
      // let notes = _.concat(data[1], data[2]);
      let notes = data[1];
      res.json({notebooks, notes});
    });

});

module.exports = router;