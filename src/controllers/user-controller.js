const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
class UserController {
    async getUser (req,res) {
        try{
            const userId = req.params.userId
            if(userId){
                const user = await User.findById(userId)
                if(!user){
                    return res.status(404).json({status:false, message:"User not found."})
                }
                return res.status(200).json({status:true, message:"Successful", data:{user}})
            }
            const user = await User.find({})
            if(!user){
                return res.status(404).json({status:false, message:"User not found."})
            }
            res.status(201).json({status:true, message:"User successfully created", data:user})
        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }
    
}

module.exports = new UserController()