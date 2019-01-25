const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var fs=require('fs');
const User=require('./user')
const Message=require('./message');

var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

const conversationSchema=mongoose.Schema({
    members:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    dateOfCreation:Date,
    messageHistory:[{ type: Schema.Types.ObjectId, ref: 'Message' }]
},schemaOptions);

module.exports=mongoose.model("Conversation",conversationSchema)