const express = require('express')
const router= express.Router()

const {verifyLogin}=require('../middlewares/verifyLogin')
const {verifyAdmin} =require('../middlewares/verifyAdmin')


const {
  signup,
  login,
  logout,
  profile,
  editProfile,
  userList,
  getAUser,
  
}= require('../controllers/userController')


//productRoutes

  /* =================================  USER SIDE  ===============================================================*/

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

router.get('/profile', verifyLogin, profile)
router.put('/profile/edit', verifyLogin, editProfile)


 


  /* =================================  ADMIN SIDE  ===============================================================*/
 
router.get('/admin/user/list', verifyLogin,verifyAdmin(), userList)
router.get('/admin/user/:id', verifyLogin,verifyAdmin(), getAUser)

module.exports= router 