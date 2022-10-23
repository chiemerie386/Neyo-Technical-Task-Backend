const User = require("../models/users")
const jwt = require("jsonwebtoken")
class AuthController {
    async register (req,res) {
        const {firstName, lastName, email, password} = req.body;
        const userExist = await User.findOne({email})

        if (userExist){
            return res.status(404).json({status:false, message:"User not found."})
        }

        const user = new User({firstName, lastName, email, password})
        await user.save()
        const token = jwt.sign({email,firstName, lastname}, process.env.JWT_SECRET)

        res.status(201).json({status:true, message:"User successfully created", data:{user, token}})
    }


    
}

module.exports = new AuthController()