const mongoos=require("mongoose")

const hostelSchema=new mongoos.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,

    },
    contactNumber:{
        type:String,
        required:true
    },
    facilities:{
        type:[String],
        default:[]
    },
    imageUrl:{
        type:String,
        default:''

    },
    ownerName:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true
    },
    isVerified: {
    type: Boolean,
    default: false
},type: {
    type: String,
    required: [true, 'Please specify the hostel type'],
    enum: {
        values: ['Boys', 'Girls', 'Co-ed', 'PG', 'Studio'],
        message: '{VALUE} is not a supported hostel type'
    },
    default: 'Co-ed'
},

},{timestamps:true})
module.exports=mongoos.model("Hostels",hostelSchema)