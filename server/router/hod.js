import express from 'express';
import Hod from '../controller/Hod.js'
import auth from '../auth/auth.js'

const router=express.Router()


router.post('/hod/register',Hod.register)
router.post('/hod/login',Hod.Login)





export default router;