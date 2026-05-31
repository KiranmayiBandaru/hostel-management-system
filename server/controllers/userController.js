const User = require('../models/User')
const bcrypt = require('bcryptjs')
const studentProfile = require('../models/student')

async function createStudent(req, res){
      try{
         
         const { name, email, phone, parentMail, parentPhone } = req.body

         if(!name || !email || !phone || !parentMail || !parentPhone)
                return res.status(400).json({ message: "Missing fields" })
      
         const existingUser = await User.findOne({email : email})
         if(existingUser)
            return res.status(400).json({message : "Email already existing"})

         const hash = await bcrypt.hash(process.env.DEFAULT_STUDENT_PASSWORD, 10)
         const newUser = await User.create({name , email ,password: hash , phone, role : 'student'})

         await studentProfile.create({
            userId : newUser._id,
            parentMail,
            parentPhone,
            address : '',
            dateOfJoining : new Date(),
            bedId : null,
            blockId : null,
            isActive : true
         })
         return res.status(201).json({message : "student profile created successfully"})

      }catch(err){
          return res.status(500).json({message : err.message})
      }
}

module.exports = { createStudent }