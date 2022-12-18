import Fine from '../schema/Fine.js'
import Student from '../schema/Student.js'
const AddFine = async(req,res) =>{
    // console.log(req.body);
    try {
         let user=new Fine({
             RegNo:req.body.RegNo,
             status:req.body.status, 
             amount:req.body.amount,
             reason:req.body.reason,
             Batch:req.body.Batch, 
         })
         const result=await user.save()
 
         res.send(result)
 
     
    } catch (error) {
     res.status(400).send(error.message)
    }
 }


 //Hod works
 const AddAll = async(req,res) =>{
    console.log(req.body);
    try { 
        let arr=[];
        const stu=await Student.find({},{RegNo:1})
        if(stu.length<=0){
            return res.send("no data")
        }
        else{
            stu.map(item => {
                arr.push(item.RegNo)
            });
        }
        console.log(arr);
        let amount=req.body.amount
        let reason=req.body.reason 
        let dat;
    async function update(item){
        const data=await Fine.insertMany({
        RegNo:item,
        amount,reason
        })
    }

    for(let i=0;i<arr.length;i++){
       const result =update(arr[i])
       dat=await Fine.find()
    }

    const get_len=await Student.find().count()
    console.log(get_len)
    if(get_len>1) return res.send(`Fine was added successfully for all the ${get_len} students.`)
    
    res.status(400).send("There is no data added")
    
    }catch (error) {
    res.status(400).send(error.message)
    }
 }


const payStatus=async(req,res)=>{
    console.log(req.params);
    const get_sts=req.params.status 
    // console.log(get_sts)
  const data=await Fine.find({status:get_sts},{})
    //   console.log(data);

  let total=await Fine.aggregate([
    {$group:{_id:{RegNo:"$RegNo",status:"$status"},total:{$sum:"$amount"}}},
    {$match:{"_id.status":get_sts}}   
])
//  console.log(total)
let add={Total:0};
 for (let index = 0; index < total.length; index++) {
    const element = total[index];
    add.Total=add.Total+Number(element.total) 
 }
//  console.log(add)
 
 res.send(total)
 const tot=total.map((item,i)=>{
    return item.total
})
const initval=0
const result=tot.reduce((current,next)=>current+next,initval)
//  res.send(`${JSON.stringify(total)},Total:${result}`)

}








 const Update=async (req, res) => {
    try {
        const date=new Date()
 
        let update=await Fine.findOneAndUpdate({_id:req.body.id},{$set:{status:req.body.status,Datepayment:date,amount:req.body.amount}},{new:true})

        res.send(update)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFine=async(req, res)=>{
   try {
    let result=await Fine.find({Batch:req.user.isBatch});
    res.status(200).send(result)
   } catch (error) {
    res.status(400).send(error.message)
   }
}
const fidparam=async(req, res) =>{
    // console.log(req.params.id);
    let id=req.params.id
   try {
    let result=await Fine.findOne({_id:id})
    if(result){
        res.status(200).send(result)
    }else{
        res.send({result:"No user found"})
    }
   } catch (error) {
    res.send(error.message);
   }
}

const updateParams= async(req, res) =>{
   try {
    let id=req.params.id
    // console.log(req.body);
    let result=await Fine.updateOne({_id:id},{$set:req.body},{new:true})
  res.status(200).send(result)
} catch (error) {
    res.send(error.message);
   }

}
// const find=async(req, res) =>{
//     try {
//         let data=await Fine.find();
//         res.send(data)
//     } catch (error) {
//         res.send(error.message);
//     }
// }

const getFie=async(req, res)=>{
    try {
     let result=await Fine.find({RegNo:req.user.RegNo});
     res.status(200).send(result)
    } catch (error) {
     
    }
 }

 const paid=async(req,res)=> {
    let data=await Fine.aggregate([
        {$group:{_id:{status:"$status"},total:{$sum:"$amount"}}}
        , {$match:{"_id.status":"paid"}}
    ])
    // console.log(data);
    let total=0
    data.map((item,i)=>{
        total=item.total
    })
    // console.log(total);
    res.status(200).send(data)
 }
 const notpaid=async(req,res)=> {
    let data=await Fine.aggregate([
        {$group:{_id:{status:"$status"},total:{$sum:"$amount"}}}
        , {$match:{"_id.status":"Not paid"}}
    ])
    // console.log(data);
//    let total=0
//     data.map((item,i)=>{
//         total=item.total
//     })
//     console.log(total);
    res.status(200).send(data)
 }
//  paid()


const search=async (req,res)=>{
    console.log(req.body);
    // try {
    //     // let result= await Fine.find({
    // //     "$or":[
    // //         {name:{$regex:req.params.key}},
    // //         {reason:{$regex:req.params.key}}
    // //     ]
    // // });
    // let result= await Fine.find({
    //     "$or":[
            
    //         {reason:req.body.reason},
    //         {RegNo:req.body.RegNo}
    //     ]
    // });
    // res.send(result)
    // } catch (error) {
    //     res.send(error.message)
    // }
    // let data= await db.Fine.deleteMany( {amount: req.body.amount},{new:true} )
    // res.send(data)
    let data=await Fine.find();
    res.send(data)
}
const dele=async(req, res) =>{

  let data= await Fine.deleteMany( {amount: req.body.amount},{new:true} )
    res.send(data)
}

// const fin=async(req, res)=>{
//     let data=await 
// }


 export default {
    AddFine,
    updateParams,
    Update,
    getFine,
    fidparam,
    getFie,
    paid,
    notpaid,
    search,
    dele,
    AddAll,
    payStatus

}