const userDB = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function loginUser(req, res){
    try{
        const {email , password} = req.body;

        if(!email || !password) 
             return res.status(400).json({message : "missing fields"})
        
        const user = await userDB.findOne({ email : email }) 

        if(!user)
            return res.status(404).json({ message : "user not found"})

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch)
            return res.status(404).json({message : "incorrect password or mail"})
        
        const token = jwt.sign(
            {userId : user._id , role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        return res.status(200).json({message : "success" , token : token})

    }catch(err){
        return res.status(500).json({message : "Something went wrong"})
    }
}

module.exports = { loginUser }