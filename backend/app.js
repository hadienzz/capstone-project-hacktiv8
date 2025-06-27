const express = require('express')
const PORT = 3001
const cors = require('cors')
const analyzeJournal = require('./controllers/analyzeController')
const app = express()
app.use(cors())
app.use(express.json())

app.post('/', analyzeJournal)


app.listen(PORT, () => (
    console.log('App listen on port: ' + PORT)
))