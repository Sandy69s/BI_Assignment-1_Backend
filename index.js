const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");

app.use(cors());
app.use(express.json());

initializeDatabase();

//add data to events in database

const eventData = {
    title:"Trading Seminar",
    date: "Wed Sep 16 2026 11:00 AM",
    eventType: "Online Event",
    image: "https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I=",
    hostedBy:"Trading Experts",
    details:"Trading Seminar serve as dynamic innovation hubs where industry leaders and developers converge to unveil groundbreaking software and AI advancements while shaping the future of the digital landscape. These events act as a massive networking powerhouse, bridging the gap between ambitious founders and strategic investors through face-to-face interactions that often spark high-level collaborations. Beyond the social aspect, attendees engage in intensive workshops to upgrade their technical skill sets and gain firsthand insights into emerging industry trends and ethical challenges. By combining high-energy keynote speeches with granular technical sessions, tech conferences provide both the inspiration and the practical tools necessary to navigate a rapidly evolving technological world.",
    dressCode:"Smart Casuals",
    ageRestrictions:"25 and above",
    eventTags:["Marketing", "digital"],
    MarketingCity:"999 Marketing Avenue Park, City",
    eventPrice:"$ 5,000",
    speakers:[
        {
            name:"Santa Doe",
            designation:"Marketing Manager",
            image:"https://placehold.co/400",
        },
        {
            name:"Banta Mathew",
            designation:"SEO Specialist",
            image:"https://placehold.co/400",
        }
    ]
}

async function createEvent( eventData ){
    try{
        const newEvent =new Event( eventData );
        savedEvent = await newEvent.save();
        console.log(savedEvent);
    }
    catch(error){
        console.log("Error adding data to database", error);
    }
}

// createEvent( eventData );

// Read all events in database

async function ReadAllEvents(){
    try{
        const allEvents = await Event.find();
        return allEvents;
    }
    catch(error){
        console.log(error);
    }
}

// ReadAllEvents();

// API to get all Events

app.get("/events", async(req, res) => {
    try{
        const allEvents = await ReadAllEvents();

        if(allEvents.length != 0){
            res.json(allEvents);
        }else{
            res.status(404).json({error: "No events found"});
        }
    }
    catch(error){
        res.status(500).json({error: "Error getting data"})
    }
})

//Read event by id

async function ReadEventById( eventId ){
    try{
        const event = await Event.findById( eventId );
        return event;
    }catch(error){
        throw error
    }
}

app.get("/events/:id", async(req, res) => {
    try{
        const event = await ReadEventById( req.params.id );

        if(event){
            res.json(event);
        }else{
            res.status(404).json({message: "Event not found"});
        }
    }
    catch(error){
        res.status(500).json({error: "Error getting event by id"});
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${ PORT }`)
});