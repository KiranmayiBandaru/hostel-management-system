const Block = require('../models/block')
const roomProfile = require('../models/room')

async function createRoom(req, res){
    try{
        
       const {blockId , startRoomNumber, lastRoomNumber, floorNumber, capacity} =  req.body
       
       if(!blockId || !startRoomNumber || !lastRoomNumber || !floorNumber || !capacity){
          return res.status(400).json({message : "missing fields"})
       }
       
       const isBlockPresent = await Block.findOne({_id : blockId})
       if(!isBlockPresent) 
         return res.status(400).json({message : "invalid block"})
       
       let roomArray = []
       for(let i = startRoomNumber ; i <= lastRoomNumber ; i++){
           roomArray.push({
              roomNumber: i,
              blockId,
              floorNumber,
              capacity
           }) 
       }
       await roomProfile.insertMany(roomArray)
       return res.status(201).json({message : `${roomArray.length} rooms created successfully`})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

module.exports = { createRoom }