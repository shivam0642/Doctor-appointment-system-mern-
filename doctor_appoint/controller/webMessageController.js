import webMessageModel from "../models/webMessageModel.js";

//Create web message 
const createMessage = async (req,res)=>{
    try {
        const {name,contact,message} = req.body

        //validation
        if(!name || !contact || !message){
            return res.status(402).send({
                success:false,
                message:"All fields are required"
            })
        }

        const webMessage = new webMessageModel({name,contact,message})
        await webMessage.save()
        res.status(201).send({
            success:true,
            message:"Message sent successfully",
            webMessage
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Create Message Controller",
            error:error.message
        })
    }
}

//Get All Web Messages Controller
const getAllMessages = async(req,res)=>{
    try {
        const webMessages = await webMessageModel.find().sort({createdAt:-1});
        res.status(200).send({
            success:true,
            message:"All web messages fetched successfully",
            totalCount:webMessages.length,
            webMessages
        })
    } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
            message:"Error in Get All Messages Controller",
      })  
    }
}

//DELETE WEB MESSAGE CONTROLLER
const deleteMessage = async(req,res)=>{
    try {
       const {id} = req.params;
       if(!id){
        return res.status(400).send({
            success:false,
            message:"Message id is required"
        })
       }
       
        const webMessage =  await webMessageModel.findByIdAndDelete(id);
        res.status(201).send({
            success:true,
            message:"Message deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete Message Controller",
            error:error.message
        })
    }
}

export {createMessage,getAllMessages,deleteMessage};