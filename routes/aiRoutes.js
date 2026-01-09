const express=require("express")
const route=express.Router()
const multer=require("multer")
const path=require("path");
const { GoogleGenAI } = require("@google/genai");

require("dotenv").config()

const stroage=multer.memoryStorage();
const upload = multer({ 
       storage:stroage,
       limits:{fileSize:5*1024*1024 }
});
function imagetoGenrativeAiFOrmate(buffer,mimeType){
       return{
              inlineData:{
                     data:buffer.toString("base64"),
                     mimeType
              }
       }
}

const genAI=new GoogleGenAI({
       apiKey:process.env.GEMINI_API_KAY
})
route.post("/extract",upload.single("imgUrl"),async(req,res)=>{
       console.log("Some one touch this route")
   try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        // Initialize Model (Flash is faster/cheaper for this)
       

        // The Magic Prompt (Strict Instructions for JSON)
        const prompt = `
            You are an OCR expert. Analyze this image of a Hostel Pamphlet or Visiting Card.
            Extract the following details and return them in pure JSON format:
            - name: (Name of the hostel)
            - price: (Price per month as a Number, estimate if range is given)
            - address: (Full address)
            - contactNumber: (Phone number)
            - facilities: (Array of strings like AC, Wi-Fi, Food)
            - type: (Guess if it is Boys, Girls, or Co-ed based on context. Default to 'Boys')
            
            IMPORTANT: Return ONLY the JSON string. Do not use Markdown code blocks. Do not add any conversational text.
        `;

        const imagePart = imagetoGenrativeAiFOrmate(req.file.buffer, req.file.mimetype);
       //  console.log(imagePart)

        // Generate Content
        const contents = [
              imagePart
  
  ,
  { text: prompt },
];
        const response = await genAI.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents:contents ,
});
        
        console.log(response.text);

        // Cleanup: Sometimes AI adds ```json ... ``` wrappers. We remove them.
        const cleanText = response.text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanText);
   res.json(data)
       

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "Failed to extract details", error: error.message });
    }
})



module.exports=route