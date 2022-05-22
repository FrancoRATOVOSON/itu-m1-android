import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import api from '../routes'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', api)
app.get('/home', (req, res) => res.send('Hello, everything is fine'))

export default app
