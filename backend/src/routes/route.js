const express = require("express")
const router = express.Router()
const useController =require("../controllers/userController")
// POST Register
router.post("/register",useController.register)

// POST Login
router.post("/login",useController.login)


//  Invalid request path
router.all("/*", (req, res) => {
    res.status(400).json({status:false, message:"Invalid Request"})
})


module.exports =router