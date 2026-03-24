const express = require("express")
const router = express.Router()

const { authZ, isStudent, isInstructor } = require("../middlewares/Authorization")
const { 
  getMyCertificates, 
  verifyCertificate, 
  generateCertificate,
  getInstructorCertificates,
  issueManualCertificate,
  deleteCertificate,
  approveCertificate
} = require("../controllers/Certificate")

// Student: list own certificates
router.get("/my", authZ, isStudent, getMyCertificates)

// Student: generate certificate if missing
router.post("/generate", authZ, isStudent, generateCertificate)

// Instructor: list all certificates for their courses
router.get("/instructor/list", authZ, isInstructor, getInstructorCertificates)

// Instructor: manual issuance
router.post("/instructor/issue", authZ, isInstructor, issueManualCertificate)

// Instructor: delete/revoke certificate
router.delete("/instructor/delete/:certificateId", authZ, isInstructor, deleteCertificate)

// Instructor: approve certificate
router.put("/instructor/approve/:certificateId", authZ, isInstructor, approveCertificate)

// Public verify (no auth)
router.post("/verify", verifyCertificate)

module.exports = router

