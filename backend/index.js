import express from 'express'
import cors from 'cors'


const app = express();
app.use(cors())
app.use(express.json())


app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`)
})