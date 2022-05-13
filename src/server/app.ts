import express from 'express'
import api from '../routes'

const app = express()

app.use('/api', api)
app.get('/', (req, res) => res.status(200).send('Hello World'))

export default app
