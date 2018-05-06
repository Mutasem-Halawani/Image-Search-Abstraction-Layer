const express = require('express')
const router = express.Router()

const imgur = require('../services/imgur')
const History = require('../models/history')

router.get('/', (req, res) => {
  res.send('Hello')
})

router.get('/latest', (req, res) => {
  History.find({}, 'term when -_id').sort('-when')
    .limit(10).then(results => {
      res.json(results)
    })
})

router.get('/search/:query', (req, res) => {
  console.log(imgur.getImage())
  imgur.getImage(req.params.query, req.query.offset).then(ans => {
    new History({term: req.params.query}).save()
    // console.log('ans: ', ans);
    res.json(ans)
  })
})

module.exports = router
