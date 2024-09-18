// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { authZ, isInstructor, isStudent, isAdmin } = require("../middlewares/Authorization")
router.post("/capturePayment", authZ, isStudent, capturePayment)
router.post("/verifyPayment",authZ, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", authZ, isStudent, sendPaymentSuccessEmail);

module.exports = router