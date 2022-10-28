const Sketch = require("../models/sketchs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
class SketchController {
    async createSketch (req,res) {
        try{
            const {userId} = req
            const { title} = req.body;
            const sketchExist = await Sketch.findOne({title})
    
            if (sketchExist){
                return res.status(400).json({status:false, message:`Sketch with title "${title}" already exixts`})
            }

            const sketch = new Sketch({title, collaborators:[userId], body:"https://res.cloudinary.com/eftd/image/upload/v1666886918/download-11_bnqxdf.jpg"})
            await sketch.save()
            res.status(201).json({status:true, message:"Sketch successfully created", data:{sketch}})
        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }

    async getSketch (req,res) {
        try{
            const sketchId = req.params.sketchId
            if(sketchId){
                const sketch = await Sketch.findById(sketchId)
                if(!sketch){
                    return res.status(404).json({status:false, message:"Sketch not found."})
                }
                return res.status(200).json({status:true, message:"Successful", data:{sketch}})
            }
            const sketch = await Sketch.find({})
            if(!sketch){
                return res.status(404).json({status:false, message:"Sketch not found."})
            }
            return res.status(200).json({status:true, message:"Successful", data:{sketch}})
        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }

    async getOneSketch (req,res) {
        try{
            const sketchId = req.params.sketchId
                const sketch = await Sketch.findById(sketchId)
                if(!sketch){
                    return res.status(404).json({status:false, message:"Sketch not found."})
                }
            return res.status(200).json({status:true, message:"Successful", data:{sketch}})
        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }

    async joinSketch (req,res) {
        try{
            const {userId} = req
            const {sketchId} = req.params
            const sketch = await Sketch.findById(sketchId)
                if(!sketch){
                    return res.status(404).json({status:false, message:"Sketch not found."})
                }
            if(sketch.collaborators.includes(userId)){
                return res.status(200).json({status:true, message:"Successful", data:{sketch}})
            }
            const updatedSketch = await Sketch.findByIdAndUpdate(
                sketchId,
                { "$addToSet": { collaborators: userId } },
                { new: true }
              )
            return res.status(200).json({status:true, message:"Successful", data:{sketch: updatedSketch}})

        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }

    async updateSketch (req,res) {
        try{
            const {userId} = req
            const {sketchId} = req.params
            const {body} = req.body
            const sketch = await Sketch.findById(sketchId)
            if(!sketch){
                return res.status(404).json({status:false, message:"Sketch not found."})
            }
            // if(!(sketch.collaborators && sketch.collaborators.includes(userId))){
            //     return res.status(403).json({status:false, message:"You don't have access to access this note."})
            // }
            const updatedSketch = await Sketch.findByIdAndUpdate(sketchId, { body }, { new: true })
            return res.status(200).json({status:true, message:"Successful", data:{sketch: updatedSketch}})
        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }


}

module.exports = new SketchController()