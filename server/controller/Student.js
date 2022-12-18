import bcrypt from 'bcryptjs' 
import jwt from 'jsonwebtoken'
import Student,{validateStudent} from '../schema/Student.js'


const Register=async(req,res)=>{
    console.log(req.body);
    const email = req.body.email
    const {error}=validateStudent(req.body)
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    const exuser=await Student.findOne({email:email});
    if (exuser) {
        res.status(400).send("email is already takken");
    }else{
        try {
            console.log(req.body.name);
            let hash=await bcrypt.hash(req.body.password,10);

            let user=new Student({  
                name:req.body.name,
                RegNo:req.body.RegNo,
                Batch:req.body.Batch,
                // Course:req.body.Course,
                Dept:req.body.Dept,
                // Section: req.body.Section,
                email:req.body.email,
                password:hash,
            });
            let result=await user.save();
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send("ekdjchjk"+error.message)
        }
    }

}

const Login=async(req,res) => {
    try {
        // console.log( req.body.email);
        let userData=await Student.findOne({email: req.body.email});
        if (!userData) {
            return res.status(400).send("email not found")
        }
        let validpassword =await bcrypt.compare(req.body.password,userData.password)
       if(!validpassword) {
        return res.status(400).send("not a valid password")
       }
       const id=userData._id
       const RegNo=userData.RegNo
      const userToken =await jwt.sign({id:id,RegNo:RegNo},process.env.JWTKEY);

      res.header('auth',userToken).send(userToken)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const Update=async (req,res)=>{
   
    const data=req.body
    // console.log(data);
    try {
        if(!req.body.RegNo && !req.body.email){
            let update=await Student.findOneAndUpdate({_id:req.user.id},{$set:data},{new:true})
            if(update){
                try {
                    res.status(200).send(update)
                } catch (error) {
                    res.status(400).send(error.message)
                }
            }else{
                console.log(req.user.id);
                res.send("student not found")
            }
        }else{
            res.send("you did not edit emil (or) RegNo")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
   
    
}
const ChangePassword=async(req,res)=>{
    try {
        let hash=await bcrypt.hash(req.body.password,10);

        let update=await Student.findOneAndUpdate({_id:req.user.id},{$set:{password:hash}},{new:true})
        res.status(200).send("updated Successfuly")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getAll = async(req, res) => {
    let result=await Student.find().select('-password')
    res.send(result)
}
const profileView=async(req, res) => {
    let result=await Student.findById({_id:req.user.id})
    res.status(200).send(result)
}
export default {Register,Login,Update,getAll,ChangePassword,profileView}