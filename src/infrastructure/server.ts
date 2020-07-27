import express from 'express'
import router from './router'
import bodyParser from 'body-parser'

const app = express()

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

export default app
