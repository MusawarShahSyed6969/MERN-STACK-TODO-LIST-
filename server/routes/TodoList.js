const express = require('express')
const router = express.Router();

const  {GetAllListController,PostListController, UpdateSelectedList, DeleteSelectedList, CompleteSelectedList} = require("../Controller/TodoListController")




router.get("/api/gettodo", GetAllListController)
router.post("/api/posttodo", PostListController)
router.put("/api/updatetodo/:id",UpdateSelectedList)
router.patch("/api/completetodo/:id",CompleteSelectedList)
router.delete("/api/deletetodo/:id",DeleteSelectedList)


module.exports = { router }

