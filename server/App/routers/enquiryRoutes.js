let express = require("express");
const { enquiryInsert, enquiryList, enquiryDel, enquiryEdit } = require("../controllers/enquiryControllers");
let enquiryRoutes = express.Router()

enquiryRoutes.post("/insert",enquiryInsert)
enquiryRoutes.get("/list",enquiryList)
enquiryRoutes.post("/delete/:id",enquiryDel)
enquiryRoutes.put("/edit/:id",enquiryEdit)
module.exports=enquiryRoutes;