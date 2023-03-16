const express = require ('express')
const app = express()
const PORT = 4000
const cors =require('cors') 

const mongoose = require ('mongoose')
mongoose.set('strictQuery',false)

//!require database model
const User = require('./Model/user')
const Post = require('./Model/post')

//!middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())//cross origin resorce sharing

//! Establishing database connection using Mongoose
const dbURL='mongodb://localhost:27017/foodie'
mongoose.connect(dbURL).then(()=>{
    console.log("connected to database");
})

app.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{
        if (userData) {
            if (req.body.Password == userData.Password) {
                res.send({message:"login sucessfull"})
            } else {
                res.send({message:"login failed"})
            }
        } else {
            res.send({message:"account does not exists"})
        }
    })
})

app.post('/signup',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{ //to check if user al ready exists
        if (userData) {
            res.send({message:"user already exists"})
        } else {
            // Creating a new User instance using data from the request body
            const data = new User({
                name:req.body.name,
                Mobile:req.body.Mobile,
                email:req.body.email,
                Password:req.body.Password
            })
            data.save(()=>{
                if (err) {
                    res.send(err)
                } else {
                    res.send({message:"registration sucessfull"})
                }
            })   
        }     
    })
})

app.get('/posts',async(req,res)=>{
    try{
        const posts= await Post.find()
        res.send(posts)
    } catch(err){
        console.log(err);
    }
})

app.get('/posts/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const singlePost = await Post.findById(id)
        res.send(singlePost)
    } catch (err) {
        // console.log(err)
        res.send(err)
    }
})

app.post('/add-post',async(req,res)=>{
    let postData = new Post({
        author:req.body.author,
        title:req.body.title,
        summary:req.body.summary,
        image:req.body.image,
        location:req.body.location
    })
    try {
        await postData.save()
        res.send({message:"post added sucessfully"})
    } catch (err) {
        res.send({message:"Failed to add post"})
    }
})
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})
