const attendance = require('../models/Attendance')
const rooms = require('../models/room')
const students = require('../models/student')
const beds = require('../models/bed')

async function markAttendance(req, res){
    try{
        const { roomNo , attendanceRecord } = req.body
        
        const room = await rooms.findOne({roomNo}) 
        if(!room) 
            res.status(400).json({message : "Room not found"})

        const bedsInRoom = await beds.find({roomId : room._id}) 
        const bedIds = bedsInRoom.map(bed => bed._id)

        const studentsInRoom = await students.find({bedId : {$in : bedIds}})
        const studentIds = new Set(studentsInRoom.map(s => s.userId))

        for(let record of attendanceRecord){
            if(!(studentIds.has(record.studentId)))
                return res.status(400).json({message : 'invalid student for this room'})
        }   
        const attendanceDocs = attendanceRecord.map(record => ({
            studentId: record.studentId,
            date: new Date(),
            status: record.status,
            markedBy: req.user.userId
        }))

        await attendance.insertMany(attendanceDocs)
        return res.status(201).json({message : `${attendanceDocs.length} records saved`})
    }catch(err){
         return res.status(500).json({message : err.message})
    }
}

module.exports = { markAttendance }