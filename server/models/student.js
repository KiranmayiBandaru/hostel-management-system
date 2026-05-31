const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = Schema({

    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentMail : {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    parentPhone :{
        type: String,
        required : true,
        
    },
    address : {
        type : String,
        required : false,
        default : ''
    },
    
    dateOfJoining : Date,
    bedId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bed',
        default : null
    },
    blockId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Block',
        required: false
    },
    isActive : {
        type : Boolean,
        default : true
    }
}, {timestamps : true})

module.exports = mongoose.model('Student' , studentSchema)