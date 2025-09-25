const express = require('express')
const NotFoundError = require('./middleware/404Handling')
const ApiError = require('./utils/ApiError')
const validationMiddleware = require('./middleware/ValidationMiddleware')
const app = express()
const morgan = require("morgan")
const cors = require('cors')
// # json parsing
app.use(express.json({}))
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1",require("./router"))

app.get('/', (req, res) => {
  res.send({msg:'Hello World!'})
})
app.use("",(req,res,next)=>{
    next(new ApiError(404,"Not Found"))
})
app.use(NotFoundError)

module.exports= app