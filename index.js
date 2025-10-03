const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const chat = require('./models/chat.js');
const methodOverride = require("method-override");


app.set("views",path.join(__dirname , "views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>console.log("Connection Successfull"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1 = new chat({
//     from : "Naman",
//     to : "Vaidik",
//     msg : "Send me Your Leetcode Profile",
//     created_at : new Date(),
// })

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

//Index Route
app.get("/chats" ,async(req , res)=>{
    let chats = await chat.find();
    console.log(chats);
    res.render("index.ejs",{chats})
});

//new Route

app.get("/chats/new" ,(req,res)=>{
    res.render("new.ejs");
});

//Create Route
app.post("/chats" ,(req,res)=>{
    let {from , to , msg} = req.body;
    let newChat = new chat({   // ✅ use chat model
        from,
        to,
        msg,
        created_at : new Date(),
    });
    newChat.save().then(res =>{console.log("chat was saved")}).catch(err =>{console.log(err)});
       
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit" , async (req , res) => {
    let { id } = req.params;
    let foundChat = await chat.findById(id);   // ✅ use model "chat"
    res.render("edit.ejs", { chat: foundChat });
});

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await chat.findByIdAndUpdate(id , 
        {msg: newMsg},
        {runValidators:true , new:true});
    res.redirect("/chats");
})

//Delete Route 
app.delete("/chats/:id" ,async(req , res)=>{
    let {id} = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    res.redirect("/chats");

})
app.get("/",(req,res)=>{
    res.send("route is working");
})
app.listen(8080,()=>{
    console.log("server is running on 8080");
});