import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { certificateEndpoints } from "../apis"

const {
  MY_CERTIFICATES_API,
  GENERATE_CERTIFICATE_API,
  INSTRUCTOR_CERTIFICATES_API,
  ISSUE_CERTIFICATE_API,
  APPROVE_CERTIFICATE_API,
  DELETE_CERTIFICATE_API,
} = certificateEndpoints

export function getInstructorCertificates(token) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading certificates...")
    let result = []
    try {
      const response = await apiConnector("GET", INSTRUCTOR_CERTIFICATES_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("INSTRUCTOR_CERTIFICATES_API ERROR............", error)
      toast.error(error.message)
    }
    // toast.dismiss(toastId)
    return result
  }
}

export function issueCertificate(userId, courseId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Issuing certificate...")
    let success = false
    try {
      const response = await apiConnector(
        "POST",
        ISSUE_CERTIFICATE_API,
        { userId, courseId },
        { Authorization: `Bearer ${token}` }
      )
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Certificate issued successfully")
      success = true
    } catch (error) {
      console.log("ISSUE_CERTIFICATE_API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }
}

export function revokeCertificate(certificateId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Revoking certificate...")
    let success = false
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_CERTIFICATE_API}/${certificateId}`,
        null,
        { Authorization: `Bearer ${token}` }
      )
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Certificate revoked successfully")
      success = true
    } catch (error) {
      console.log("DELETE_CERTIFICATE_API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }
}

export function approveCertificate(certificateId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Approving certificate...")
    let success = false
    try {
      const response = await apiConnector(
        "PUT",
        `${APPROVE_CERTIFICATE_API}/${certificateId}`,
        null,
        { Authorization: `Bearer ${token}` }
      )
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Certificate approved successfully")
      success = true
    } catch (error) {
      console.log("APPROVE_CERTIFICATE_API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }
}

export function getStudentCertificates(token) {
  return async (dispatch) => {
    let result = []
    try {
      const response = await apiConnector("GET", MY_CERTIFICATES_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("MY_CERTIFICATES_API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }
}

export function generateStudentCertificate(courseId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Generating certificate...")
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        GENERATE_CERTIFICATE_API,
        { courseId },
        { Authorization: `Bearer ${token}` }
      )
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Certificate generated!")
      result = response.data.data
    } catch (error) {
      console.log("GENERATE_CERTIFICATE_API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
}
