import "./App.css";
import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/Homepage"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Navbar from "./components/common/Navbar";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import Error from "./pages/Error";
import PrivateRoute from './components/core/Auth/PrivateRoute'
import DashBoardPage from "./pages/DashBoardPage";
import MyProfile from './components/core/DashboardPage/MyProfile'
import Settings from "./components/core/DashboardPage/Settings";
import { ACCOUNT_TYPE } from "./utils/constant";
import { useSelector } from "react-redux";
import Cart from './components/core/DashboardPage/Cart/index'
import EnrolledCourses from "./components/core/DashboardPage/EnrolledCourse/EnrolledCourses";
import AddCourse from './components/core/DashboardPage/AddCourse/index'
import MyCourses from './components/core/DashboardPage/MyCourses'
import EditCourse from './components/core/DashboardPage/EditCourse/index'
import CatalogPage from "./pages/CatalogPage";
import CourseDetailsPage from './pages/CourseDetailsPage'
import ViewCourse from './pages/ViewCoursePage'
import VideoDetails from './components/core/viewcourse/VideoDetails'
import Instructor from "./components/core/DashboardPage/Instructor";
import Certificates from "./components/core/DashboardPage/Certificates";
import VerifyCertificatePage from "./pages/VerifyCertificatePage";
import AddCategory from "./components/core/DashboardPage/AddCategory";
import CertificateViewPage from "./pages/CertificateViewPage";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    // On load or when changing themes, best to add inline in `head` to avoid FOUC
    // But this standard approach works for React
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
  <div className="w-screen min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-inter transition-colors duration-300">

  <Navbar/>
    
  <Routes>
    

      <Route path="/" element={<HomePage/>} /> {/* Home Page Route */}
      <Route path="catalog/:catalogName" element={<CatalogPage/>} /> 
      <Route path="courses/:courseId" element={<CourseDetailsPage/>} /> /

    {/* ******************OPEN_ROUTES YOU CANNOT GO THESE ROUTE IF YOU ARE LOGGED_IN********************* */}

      <Route path="/signup" element={<OpenRoute> <SignupPage/> </OpenRoute>}/> {/* Signup Page Route */}
      <Route path="/login" element={<OpenRoute> <LoginPage/> </OpenRoute>}/> {/* Login Page Route */}
      <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>{/*  Verify Email Route */}
      <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>{/*  Forgot Password Route */}
      <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>}/> {/* Update Password Routescope of security */}
      <Route path="/about" element={<OpenRoute><AboutPage/></OpenRoute>}/> {/* About page route*/}
      <Route path="/contact" element={<OpenRoute><ContactUsPage/></OpenRoute>}/> {/* contactus page route*/}
      <Route path="/verify-certificate" element={<OpenRoute><VerifyCertificatePage/></OpenRoute>} />
      <Route path="/certificate/:certificateId" element={<CertificateViewPage/>} />
      

      {/* ****************** YOU CAN GO THESE ROUTE ONLY IF YOU ARE LOGGED_IN********************* */}
      {/* ********************************PROTECTED_ROUTES********************************************* */}
      <Route element={<PrivateRoute><DashBoardPage/></PrivateRoute>}> 
         <Route path="/dashboard/my-profile" element={<MyProfile/>}/> 
         <Route path="/dashboard/settings" element={<Settings/>}/> {/* setting component is implemented in folder structure */}

          {/* MANDATORY_CHECK_SO_THAT_INSTRUCTOR_CANNOT_VISIT_THIS_PAGE_ROUTE */}

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
           <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="dashboard/certificates" element={<Certificates />} />
           </>
          )
        } 

          {/* MANDATORY_CHECK_SO_THAT_STUDENT_CANNOT_VISIT_THIS_PAGE_ROUTE */}


       {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
           <>
           <Route path="dashboard/instructor" element={<Instructor />} />
           <Route path="dashboard/add-course" element={<AddCourse />} />
            <Route path="dashboard/add-category" element={<AddCategory />} />
           <Route path="dashboard/my-courses" element={<MyCourses />} />
           <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
           </>
          )
        }

       </Route> 



      {/* ********************************PROTECTED_ROUTES_VIEW_COURSE_CONTENT************************* */}
       <Route
      element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
        {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
              </>
            )
        }
      </Route> 



      {/* ANOYNMUS_ROUTE */}
      <Route path="*" element={<Error />}/>

  </Routes>
    

 </div>);
}

export default App;
