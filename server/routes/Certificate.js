const express = require("express")
const router = express.Router()

const { authZ, isStudent } = require("../middlewares/Authorization")
const { getMyCertificates, verifyCertificate, generateCertificate } = require("../controllers/Certificate")

// Student: list own certificates
router.get("/my", authZ, isStudent, getMyCertificates)

// Student: generate certificate if missing
router.post("/generate", authZ, isStudent, generateCertificate)

// Public verify (no auth)
router.post("/verify", verifyCertificate)

module.exports = router

