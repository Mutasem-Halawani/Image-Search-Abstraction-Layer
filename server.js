const express = require('express')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const port = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.post('/', upload.single('file'), (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    'File-Size': `${req.file.size} Bytes`
  }))
})

app.listen(port, console.log(`Listening on port ${port}`))
