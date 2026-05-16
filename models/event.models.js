const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    eventType:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    hostedBy:String,
    details:String,
    dressCode:String,
    ageRestrictions:String,
    eventTags:[{
        type:String,
    }],
    MarketingCity:String,
    eventPrice:String,
    speakers:[{
        name:String,
        designation:String,
        image:String,
    }],
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;