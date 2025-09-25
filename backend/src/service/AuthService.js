const { UserModel } = require('../models/User.model.js'); // adjust path
const ApiError = require('../utils/ApiError.js');
const bcryptjs = require("bcryptjs")
const JWTService = require("../utils/JwtService.js")
class AuthService{
    static async loginUser(body){
        
        const {email, password} = body
        const check_exist= await UserModel.findOne({email})
        if(!check_exist){
            throw new ApiError(400,"No Account Registred");
            
        }
        const isMatch = await bcryptjs.compare(password, check_exist.password)
        if(!isMatch){
            throw new ApiError(400, "INVALID PASSWORD");
        }

        const token = JWTService.generateToken(check_exist._id)

        return{
            msg:"Login Successfull",
            "token":token
        }

    }

    static async registerUser(body){

        const {name, email, password, ac_type} = body

        const check_exist = await UserModel.findOne({ email:email.toLowerCase() })
        if(check_exist){
            throw new ApiError(400, "Email Already Exists")
        }
            const user = await UserModel.create({
                name, email, password, ac_type
            })

        const token = JWTService.generateToken(user._id)
            return{
            msg:"Registration Successfull",
            "token":token
        }
    }

    static async profileUser(user){
        const userd = await UserModel.findById(user)
        .select("name email ac_type createdAt -_id")

        if(!userd){
            throw new ApiError(401,"Profile not found")
        }
        return userd
    }
}
module.exports = AuthService