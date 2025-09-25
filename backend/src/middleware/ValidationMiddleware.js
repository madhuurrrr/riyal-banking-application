const { validationResult } = require("express-validator")
const ApiError = require("../utils/ApiError")

const validationMiddleware = async(req,res,next)=>{
    const result = validationResult(req)
    if(!result.isEmpty()){
        throw new ApiError(400, result.array()[0].msg)
    }
    next()
}

module.exports = validationMiddleware