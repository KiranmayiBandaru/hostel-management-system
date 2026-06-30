 const room = require('../models/room')
 const Beds = require('../models/bed')

 async function createBeds(req, res){
    try{
        const { blockId } = req.body
        if(!blockId) 
            return res.status(400).json({message : "missing fields"})

        const rooms = await room.find({blockId})
        if(rooms.length === 0)
            return res.status(400).json({message : "block doesn't exist or incorrect block"})
  
        const roomIds = rooms.map(room => room._id)
        const existingBeds = await Bed.findOne({roomId : {$in : roomIds }})
        if(existingBeds)
            return res.status(400).json({message : "beds already created for this block"})
        let allBeds = []
        rooms.forEach(room => {
            for(let i = 1 ; i <= room.capacity ; i++){
                allBeds.push({
                    bedNo : i,
                    roomId : room._id,
                    isAvailable : true
                })
            }
        })
        await Beds.insertMany(allBeds)
        return res.status(201).json({message : `${allBeds.length} beds created`})

    }catch(err){
        return res.status(500).json({message : err.message})
    }
 }

 module.exports = { createBeds }