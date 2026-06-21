const User = require('../models/User.js')
const Block = require('../models/blocks')

async function createBlock(req, res){
    try{
            const {blockName, managedBy} = req.body

            if(!blockName || !managedBy){
                return res.status(400).json({message : "missing fields"})
            }
            
            const newblock = await Block.findOne({blockName : blockName}) 
            if(newblock)
                return res.status(400).json({message : "block name already exists"})

            const adminUser = await Block.findOne({_id : managedBy , role : 'admin'})
            if(!adminUser)
                return res.status(400).json({messgae : "invalid user id"})
            await blockProfile.create({
                blockName,
                managedBy
            })

            return res.status(200).json({message : "new hostel block alloacted"})
       }catch(err){
            return res.status(500).json({message : err.message})
       }
}

module.exports = {createBlock}