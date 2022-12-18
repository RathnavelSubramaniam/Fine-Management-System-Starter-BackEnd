import express from "express";
import Fine from '../controller/Fine.js';
import auth from '../auth/auth.js'
import Staff from '../auth/staff.js'

import authHod from "../auth/hod.js";


const router=express.Router()

router.post('/fine/add',Fine.AddFine)
router.post('/fine/update',Fine.Update)
router.get('/fine/get',auth,Fine.getFine)
router.get('/fine/find/:id',Fine.fidparam)
router.put('/fine/update-fine/:id',Fine.updateParams)
router.get('/fine/ger',auth,Fine.getFie)
router.get('/fine/paid',Fine.paid)
router.get('/fine/notpaid',Fine.notpaid)
router.get('/fine/search',Fine.search)
router.post('/fine/delete',Fine.dele)



router.get('/status/:status',[auth,authHod],Fine.payStatus)
router.post('/fine/all',Fine.AddAll)


export default router;