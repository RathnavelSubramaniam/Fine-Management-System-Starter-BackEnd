const authStaff=(req,res,next)=>{
    // console.log(req.user.isStaff);
    if(!req.user.isStaff) return res.status(403).send('Access Denide ')
    next()
}

export default authStaff;