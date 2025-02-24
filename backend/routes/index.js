const express = require('express');
const userRouter = require("./user"); 
const accountRouter = require("./account");

const router = express.Router();

router.use("/user", userRouter); 
router.use("/account", accountRouter);
router.use("/users", userRouter);  // ✅ Add this line to handle the /users route

module.exports = router;
