const express = require('express')
const router = express.Router()
const path = require('path')
const imgur = require('../services/imgur')
const History = require('../models/history')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

router.get('/latest', (req, res) => {
  History.find({}, 'term when -_id').sort('-when')
    .limit(10).then(results => {
      console.log(results)
      res.json(results)
    })
})

router.get('/search/:query', (req, res) => {
  imgur.getImage(req.params.query, req.query.offset).then(ans => {
    new History({term: req.params.query}).save()
    res.json(ans)
  })
})

module.exports = router
