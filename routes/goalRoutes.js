const express=require('express');
const router=express.Router();
const controllers=require('../controllers/goalControllers')
const { protectGetUser } =require('../middleware/authMiddleware');

router.get('/',protectGetUser ,controllers.getGoals)
router.get('/:id',protectGetUser ,controllers.getGoalsById)
router.post('/',protectGetUser ,controllers.createGoals)
router.put('/:id',protectGetUser ,controllers.updateGoals)
router.delete('/:id',protectGetUser ,controllers.deleteGoals)

module.exports=router;
  