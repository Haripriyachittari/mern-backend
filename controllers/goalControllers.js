const asyncHandler=require('express-async-handler')
const Goal=require('../models/goalModel')
const User=require('../models/userModel')
// @desc GET GOALS
// @route GET/api/goals
// @access PRIVATE
const getGoals=asyncHandler(async(req,res) =>{
 const goals= await Goal.find({user:req.user.id})
    res.send(goals)
  })

  // @desc GET GOALS
// @route GET/api/goals
// @access PRIVATE
const getGoalsById=asyncHandler(async(req,res) =>{
    const id=req.params.id
    const goals= await Goal.findById(id)
       res.status(200).json(goals)
     })

  // @desc POST GOALSasyncHandler(
// @route POST/api/goals
// @access PRIVATE
const createGoals=asyncHandler(async(req,res)=>{
    console.log(req.body)
    if (!req.body.goal) {
      res.status(400)
      throw new Error('Please add a text field')
    }
  
  
   const goal=await Goal.create({
    goal:req.body.goal,
    user:req.user.id
   })
   res.status(200).json(goal)

    
  })
  // @desc UPDATE GOALS
// @route PUT/api/goals/:id
// @access PRIVATE
  const updateGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
   
    if(!goal)
    {
        res.status(400);
        throw Error('Goal not found')
    }
    //check for user
    if(!req.user)
    {
      res.status(401);
      throw Error('User not found')
    }
    //check if the  goal matches with the user
    if(goal.user.toString()!==req.user.id){
      res.status(401);
      throw Error('User not authorized')
    }
   
    const updateGoals=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updateGoals)
   
})
// @desc DELETE GOALS
// @route DELETE /api/goals/:id
// @access PRIVATE
const deleteGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal)
    {
        res.status(400);
        throw Error('Goal not found')
    }
     // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }


       await  Goal.findByIdAndRemove(req.params.id)
        res.json({
            id:req.params.id
         })
    
    
  })


  
  module.exports={
    getGoals,
    updateGoals,
    createGoals,
    deleteGoals,getGoalsById
  }