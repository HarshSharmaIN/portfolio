import express from "express"
import bodyParser from "body-parser"
import ejs, { render } from "ejs"
import mongoose from "mongoose"

const app = express()

app.use(express.static("public"))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://Cluster74109:XEVdXU5sclpR@cluster74109.ue32tcy.mongodb.net/productsDB")

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    size: String,
    price: Number
})

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    suggestions: String
})

const product = new mongoose.model('Product',productSchema)

const Message = new mongoose.model('Message', messageSchema)

const redtee = new product({
    image: "assets/tee1.jpg",
    name: "Red Tee",
    size: "Free Size",
    price: 299
})

const blacktee = new product({
    image: "assets/tee2.jpg",
    name: "Black Tee",
    size: "Free Size",
    price: 299
})

const whitetee = new product({
    image: "assets/tee3.jpg",
    name: "White Tee",
    size: "Free Size",
    price: 299
})

const bluetee = new product({
    image: "assets/tee4.jpg",
    name: "Blue Tee",
    size: "Free Size",
    price: 299
})

app.get("/", (req,res)=>{
    res.render("portfolio")
})

app.get("/services", (req,res)=>{
    res.render("services")
})

app.get("/contactus", (req,res)=>{
    Message.find({})
        .then(foundMessage=>{
            res.render("contactus",{message: foundMessage})
        })
        .catch(err=>{
            console.log(err);
        })
})

app.get("/cart", (req,res)=>{
    product.find({})
        .then(founditems=>{
            res.render("cart",{cart: founditems})
        })
        .catch(err=>{
            console.log(err);
        })
})

app.get("/mart", (req,res)=>{
    res.render("mart")
})

app.post("/mart", (req,res)=>{
    if (req.body.teename == "redtee") {
        redtee.save();
    }
    else if (req.body.teename == "blacktee") {
        blacktee.save();
    }
    else if (req.body.teename == "whitetee") {
        whitetee.save();
    }
    else if (req.body.teename == "bluetee") {
        bluetee.save();
    }
    res.redirect("/cart")
})

app.post("/delete", (req,res)=>{
    product.findByIdAndRemove(req.body.id)
        .then(()=>{
            res.redirect("/cart")
        })
        .catch(err=>{
            console.log(err);
        })
})

app.post("/contactus",(req,res)=>{
    const message = new Message({
        name: req.body.name,
        email: req.body.email,
        suggestions: req.body.suggestions
    })
    message.save();
    res.redirect("/contactus")
})

app.listen(3000, ()=>{
    console.log('Server Started on Port 3000.');
})