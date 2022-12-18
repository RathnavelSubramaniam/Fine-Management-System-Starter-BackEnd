
import Hod,{validateHod} from '../schema/hod.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const register = async(req,res) =>{
    const email = req.body.email
    const {error}=validateHod(req.body)
   try {
    if(error) return res.status(400).send(error.details[0].message);
 
    const exUser=await Hod.findOne({email: email})
    if(exUser){
        res.send("email is already taken")
    }
    else{
        let hash =await bcrypt.hash(req.body.password,10)
       
        let user=new Hod({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            dept:req.body.dept
        })
        const result=await user.save()
        res.send(result)

    }
   } catch (error) {
    res.status(400).send(error.message)
   }
}


const Login = async(req, res) => {
    try {
        console.log( req.body);
        let userData=await Hod.findOne({email: req.body.email});
        if (!userData) {
            return res.status(400).send("email not found")
        }
        let validpassword =await bcrypt.compare(req.body.password,userData.password)
       if(!validpassword) {
        return res.status(400).send("not a valid password")
       }
       const id=userData._id
       const hod=userData.isHod
    
      const userToken =await jwt.sign({id:id,isHod:hod},process.env.JWTKEY);

      res.header('auth',userToken).send(userToken)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
export default {register,Login}