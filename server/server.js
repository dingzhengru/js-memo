import express from 'express'
import cors from 'cors'
import path from 'path'


const port = 50001

const app = express()

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

// app.use(cors(corsOptions))
app.use(cors())

// app.use(express.static(path.join(__dirname, 'dist')))

app.use(express.static('.'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
    console.log(`listening on ${ port }`)
})