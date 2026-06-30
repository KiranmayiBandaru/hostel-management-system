const Attendance = require('../models/Attendance')

async function getAttendance(req, res){
    try{
        const { studentId, startDate, endDate } = req.query    
        
        let query = {}
        
        if(studentId) query.studentId = studentId  
        
        if(startDate || endDate){  
            query.date = {}
            if(startDate) query.date.$gte = new Date(startDate)
            if(endDate) query.date.$lte = new Date(endDate)
        }
        
        const records = await Attendance.find(query)
        return res.status(200).json(records)

    }catch(err){
        return res.status(500).json({ message: err.message })
    }
} 

module.exports = { getAttendance }