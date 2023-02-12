const express = require("express")
const mongoose = require("mongoose")
const router = require("./route/route.js")
const cron = require("node-cron");
const moment = require("moment");

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://InternetThug:Siddhant123@cluster0.t0cdfcj.mongodb.net/scheduler")
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', router)

const events = [
    { text: "textOne", dateTime: "2020-07-10 15:00:00.000" },
    { text: "textTwo", dateTime: "2020-07-10 15:10:00.000" },
    { text: "textThree", dateTime: "2020-07-10 15:20:00.000" },
];

events.forEach((event) => {
    const dateTime = event.dateTime
    cron.schedule(dateTime, () => {
        triggerFunction(event.text);
    });
});

function triggerFunction(text) {
 console.log(`Returning text backwards: ${text.split("").reverse().join("")}`);
}


app.listen(3000, () => console.log("Server is running"))




