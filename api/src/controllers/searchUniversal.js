const express = require('express');
const _ = require('lodash');
const models = require('../models');
const Promise = require('sequelize').Promise;
// const Op = require('sequelize').Op;

const router = express.Router();

router.get('/', (req, res) => {
  const notebooks = models.Notebook.findAll({
    where: {
      title: req.body.title
    }
  });

  // const notes = models.Note.findAll({
  //   where: {
  //     [Op.or] : [
  //       { title: 'Car' },
  //       { content: 'Toy' }
  //     ]
  //   }
  // });
  models.Note.findAll({
    where: {
      // [Op.or] : [{ title: 'Car' }, { content: 'Toy' }]
      [require('sequelize').Op.or]: [{ a: 5 }, { b: 6 }], 
    }
  })
  // .then(data => {
  //   res.json({data})
  // });

  // Promise.all([notebooks, notes])
  //   .then(data => {
  //     let notebooks = data[0];
  //     let notes = data[1];
  //     res.json({notebooks, notes});
  //   });

});

module.exports = router;