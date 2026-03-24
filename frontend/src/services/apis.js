export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api/v1"









// AUTH ENDPOINTS
export const endpoints = {
  // fhdfkj
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHECK_PERMISSION_TOKEN_API: BASE_URL + "/auth/check-permission-token"
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  GET_INSTRUCTOR_STUDENTS_API: BASE_URL + "/profile/instructorStudents",
  REMOVE_STUDENT_API: BASE_URL + "/course/removeStudent",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
  DELETE_CATEGORY_API: BASE_URL + "/course/deleteCategory",
  ADD_EXAM_NOTE_API: BASE_URL + "/course/addExamNote",
  DELETE_EXAM_NOTE_API: BASE_URL + "/course/deleteExamNote",
  ADD_SUBSECTION_NOTE_API: BASE_URL + "/course/addSubSectionNote",
  DELETE_SUBSECTION_NOTE_API: BASE_URL + "/course/deleteSubSectionNote",
  GET_EXAM_NOTES_API: BASE_URL + "/course/getExamNotes",
  GET_SUBSECTION_NOTES_API: BASE_URL + "/course/getSubSectionNotes",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = BASE_URL + "/course/getCategoryPageDetails"


// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// CERTIFICATE ENDPOINTS
export const certificateEndpoints = {
  VERIFY_CERTIFICATE_API: BASE_URL + "/certificate/verify",
  MY_CERTIFICATES_API: BASE_URL + "/certificate/my",
  GENERATE_CERTIFICATE_API: BASE_URL + "/certificate/generate",
  INSTRUCTOR_CERTIFICATES_API: BASE_URL + "/certificate/instructor/list",
  ISSUE_CERTIFICATE_API: BASE_URL + "/certificate/instructor/issue",
  APPROVE_CERTIFICATE_API: BASE_URL + "/certificate/instructor/approve",
  DELETE_CERTIFICATE_API: BASE_URL + "/certificate/instructor/delete",
}