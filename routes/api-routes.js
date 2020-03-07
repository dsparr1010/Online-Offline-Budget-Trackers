const express = require('express');
const router = require('express').Router();
const Transaction = require('../models/Transaction');

//GET all transactions in descending order so that last transaction is listed first
router.get('/api/transaction', (req, res) => {
    Transaction.find({})
    .sort({date:-1})
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

//pulling body out of res to insert one transaction to db
router.post('/api/transaction', ({body}, res) => {
    Transaction.create(body)
    .then(result => {
        res.toJSON(result)
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

//POST multiple transactions
router.post("/api/transaction/bulk", ({ body }, res) => {
    Transaction.insertMany(body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  module.exports = router;