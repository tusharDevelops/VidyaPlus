// import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

//import frameImg from "../../../assets/Images/security-analysts-protect-internet-connected-systems-with-shield-cyber-security-data-protection-cyberattacks-concept.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 lg: max-w-[650px] md:mx-0">
            {/* <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className=" absolute z-11  top-0 left-1"
            /> */}
            <img
              src={image}
              alt="Students"
              width={550}
              height={400}
              loading="lazy"
              // className="absolute -top-6 right-4 z-10 rounded-md shadow-[0_0_30px_0] shadow-[#6782fc]"
              className={` ${formType === "signup" ? "-top-3": " -top-8" } overflow-hidden right-0 z-10 rounded-md shadow-[0_0_30px_0] shadow-[#6782fc] ` }
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template