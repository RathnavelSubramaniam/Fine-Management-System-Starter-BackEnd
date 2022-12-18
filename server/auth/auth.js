import jwt from 'jsonwebtoken'

const auth=async(req,res,next)=>{
    const token=req.headers.token
    // console.log(token);
    // console.log("dskjjjdk");
    if(!token) return res.status(401).send('Access Denide no token provide')
    try {
        // console.log(token);
        const decoded=jwt.verify(token,process.env.JWTKEY);
        req.user = decoded
        // console.log(req.user);
        next();
    } catch (error) {
        res.send("invalid token")
    }
}

export default auth