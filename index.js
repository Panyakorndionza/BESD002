const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const course = require('./course.js')
app.use('/course', course)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})