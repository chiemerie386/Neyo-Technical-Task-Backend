const Sketch = require("../models/sketchs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
class SketchController {
    async createSketch (req,res) {
        try{
            const { title} = req.body;
            const sketchExist = await Sketch.findOne({title})
    
            if (sketchExist){
                return res.status(400).json({status:false, message:`Sketch with title ${title} already exixts`})
            }

            const sketch = new Sketch({title})
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
                return res.status(201).json({status:true, message:"Successful", data:{sketch}})
            }
            const sketch = await Sketch.find({})
            if(!sketch){
                return res.status(404).json({status:false, message:"Sketch not found."})
            }
            return res.status(201).json({status:true, message:"Successful", data:{sketch}})
        }catch (err) {
            console.log(err)
            res.status(500).json({status:false, message:"Internal server error."});
        }
    }


}

module.exports = new SketchController()