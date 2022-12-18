import express from "express";
import Student from '../controller/Student.js'
import auth from '../auth/auth.js'
const router=express.Router()

router.post('/Student/register',Student.Register)
router.post('/student/login',Student.Login)
router.post('/student/update',auth,Student.Update)
router.get('/student/get',auth,Student.getAll)
router.post('/student/changePassword',auth,Student.ChangePassword)
router.get('/student/profile',auth,Student.profileView)





export default router;