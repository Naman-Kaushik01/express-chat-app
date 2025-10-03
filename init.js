const mongoose = require('mongoose');
const chat = require('./models/chat.js');

main().then(()=>console.log("Connection Successfull"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats =[
    {
    from : "Naman",
    to : "Vaidik",
    msg : "Send me Your Leetcode Profile",
    created_at : new Date(),
},
{
    from : "Deepak",
    to : "Vaidik",
    msg : "I am coming to sector 51",
    created_at : new Date(),
},
{
    from : "Siddhant",
    to : "Naman",
    msg : "Bhai Attendance laga dena ",
    created_at : new Date(),
},

]
chat.insertMany(allChats);