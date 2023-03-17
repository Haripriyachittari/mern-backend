const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


// @desc REGISTER user
// @route POST/api/users
// @access PRIVATE
const registerUser=asyncHandler(async(req,res) =>{
 const {name,email,password}=req.body;
 if(!name||!email||!password)
 {
    res.status(400)
    throw Error('Please provide all the details');
 }
 const userExists=await User.findOne({email});
 if(userExists)
 {
    res.status(400)
    throw Error('User already exists')
 }
 //hash password
 const salt=await bcrypt.genSalt(10);
 const hashPassword= await bcrypt.hash(password,salt)
 const user= await User.create({
    name:name,
    email,email,
    password:hashPassword
 })
 if(user){
    res.json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user.id)
        
    })
 }
 else{
    res.status(400)
    throw Error('Invalid user details')
 }

})


const socialRegister=asyncHandler(async(req,res) =>{
   const {name,email}=req.body;
   if(!name||!email)
   {
      res.status(400)
      throw Error('Please provide all the details');
   }
   const userExists=await User.findOne({email});
   if(userExists)
   {
      res.status(400)
      throw Error('User already exists')
   }
   
   const user= await User.create({
      name:name,
      email,email,
      
   })
   if(user){
      res.json({
          _id:user.id,
          name:user.name,
          email:user.email,
          token:generateToken(user.id)
          
      })
   }
   else{
      res.status(400)
      throw Error('Invalid user details')
   }
  
  })
  

 // @desc AUTHENTICATION
// @route POST/api/users/login
// @access PRIVATE
const socialLogin=asyncHandler(async(req,res) =>{
   const {email}=req.body
   console.log(req.body)
   //check email
   const user=await User.findOne({email})
   console.log(user)

   if(user){
   res.json({
       message:"login successfull",
       _id:user.id,
       name:user.name,
       email:user.email,
       token:generateToken(user.id)
       
   })}
   else{
       res.status(400)
       throw Error('Invalid credentials')
   }
 })

   // @desc AUTHENTICATION
// @route POST/api/users/login
// @access PRIVATE
const loginUser=asyncHandler(async(req,res) =>{
    const {email,password}=req.body
    console.log(req.body)
    //check email
    const user=await User.findOne({email})
    console.log(user)

    if(user && (await bcrypt.compare(password,user.password))){
    res.json({
        message:"login successfull",
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user.id)
        
    })}
    else{
        res.status(400)
        throw Error('Invalid credentials')
    }
  })
  // @desc GET user
// @route GET/api/users/me
// @access PRIVATE
const getUser=asyncHandler(async(req,res) =>{
res.status(200).json(req.user)
  })

const generateToken=(id)=>{
     return  jwt.sign({id},process.env.JWT_SECRET)
   }



  module.exports={
    registerUser,
    loginUser,
    getUser,
    socialRegister,
    socialLogin,

  }