const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
class AuthController {
    async register (req,res) {
        try{
            const {firstName, lastName, email, password} = req.body;
            const userExist = await User.findOne({email})
    
            if (userExist){
                return res.status(400).json({status:false, message:"User already exists."})
            }

            const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
            const user = new User({firstName, lastName, email, password:hashedPassword})
            await user.save()
            const token = jwt.sign({email, firstName, lastName, id:user._id}, process.env.JWT_SECRET)
            res.status(201).json({status:true, message:"User successfully created", data:{user, token}})
        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }

    async login (req, res) {
        try{
            const { email, password} = req.body;
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({status:false, message:"User dosen't exists."})
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect){
                return res.status(400).json({status:false, message:"Invalid login Credentials."})
            }

            const {_id:id, firstName, lastName} = user
            const token = jwt.sign({email, firstName, lastName, id}, process.env.JWT_SECRET)
            res.status(200).json({status:true, message:"User successfully loggedin.", data:{user, token}})

        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
        
    }


    
}

module.exports = new AuthController()