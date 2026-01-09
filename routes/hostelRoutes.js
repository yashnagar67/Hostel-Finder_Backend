const express=require("express")
require("dotenv").config()
const router=express.Router()
const hostel=require("../models/hostels")

router.post("/",async(req,res)=>{
    if(req.body.adminpassword!==process.env.ADMINPASSWORD){
        
        return res.status(403).json({ message: "Access Denied: Wrong Admin Code!" });
    }
    try{
    
    

    const newhostel= new hostel(req.body)
    const saved=await newhostel.save();

    res.json({work:"DOne"});
    }catch(err){
       
        res.send("error")
    }

})
router.get("/",async(req,res)=>{
    try{
        const hostels=await hostel.find()
        res.json(hostels)
    }catch(err){
        res.send("error wile finding hostels",err.message)
    }
})
router.get("/:id",async(req,res)=>{
    // console.log("OK im searching for this ",req.params.id)
    
    try{
        const hostels=await hostel.findById(req.params.id)
       
        res.json(hostels)
    }catch(err){
        res.send("error wile finding hostels",err.message)
    }
})

module.exports=router