const authHod=(req,res,next)=>{
    // console.log(req.user.isStaff);
    if(!req.user.isHod) return res.status(403).send('Access Denide ')
    next()
}

export default authHod;