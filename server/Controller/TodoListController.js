const mongoose = require("mongoose");
const TodoListModel = require("../models/TodoListModel")

const GetAllListController = async (req,res) => 
{

    const TodoList = await TodoListModel.find({})
    res.json({message : "List Fetched Succesfully ",status:1 , TodoList})
    console.log(TodoList);
    
}


const PostListController = async (req,res) => 
{
    const {Todo} = req.body

    if(!Todo)
    {
        res.json({message:"List Cant Be Empty",status:0})

        return 
    }

    const newList = await TodoListModel.create({Todo});

    newList.save();

    res.json({message:"List Added Succesfully",status:1, newList})

}

const UpdateSelectedList = async (req,res) => 
{
    const { Todo} = req.body
    const {id} = req.params

    

    if(!mongoose.isValidObjectId(id))
        return  res.json({message:" Updated ID Not Valid and object Type " ,status:0})


    if(!Todo)
        return res.json({message:"New Todo Cant Be Empty",status:0})
    
     const newUpdatedList = {Todo}

    const UpdatedList = await TodoListModel.findByIdAndUpdate(id,newUpdatedList);



    


    if(!UpdatedList)
        return   res.json({message:" Updated ID is Not Matching ",status:0})

    

    
    
    res.json({message:"List Updated Succesfully",UpdatedList,status:1})
}

const DeleteSelectedList = async (req,res) =>
{
    const {id} = req.params;

   

   
if(mongoose.isValidObjectId(id)){

    const deletedList = await TodoListModel.findByIdAndDelete({_id:id})

   
    if(!deletedList)
        return   res.json({message:" Deleted ID is Not Matching ",status:0})
    


    

    res.json({message:"List Deleted Succesfully",status:1})

}else{
    res.json({message:" Deleted ID Not Valid and object Type ",status:0})
}

}

const CompleteSelectedList = async (req,res) => 
{
    const {id } = req.params;
    const {isCompleted} = req.body;

    if(!id)
        return res.json({message:" ID is NULL ",status:0})

    if(!mongoose.isValidObjectId(id))
        return  res.json({message:" Completed ID Not Valid and object Type " ,status:0})


    const UpdatedList = await TodoListModel.findByIdAndUpdate(id,{isCompleted},{new:true});

    if(!UpdatedList)
        return   res.json({message:" Updated ID is Not Matching ",status:0})

    await res.json({message:"Status Updated Succesfully",UpdatedList,status:1})

}


module.exports = {GetAllListController,PostListController,UpdateSelectedList,DeleteSelectedList,CompleteSelectedList}