import express from "express"
import { Add, Delete, Deleteall, Edit, Read } from "../controller/curdController.js"

const router =express.Router()
router.post("/api/curd",Add)
router.get("/api/curd",Read)
router.put("/api/curd/:id",Edit)
router.delete("/api/curd/:id",Delete)
router.delete("/api/curd",Deleteall)


export default router