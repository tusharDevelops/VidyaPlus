// import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

//import frameImg from "../../../assets/Images/security-analysts-protect-internet-connected-systems-with-shield-cyber-security-data-protection-cyberattacks-concept.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center bg-canvas dark:bg-slate-900 transition-colors duration-300">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-20">
          <div className="mx-auto w-11/12 max-w-[480px] md:mx-0 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              <span>{description1}</span>{" "}
              <span className="text-brand-coral font-black italic">
                {description2}
              </span>
            </p>
            <div className="mt-8 bg-white dark:bg-slate-900 p-8 rounded-hero border border-hairline dark:border-slate-800">
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>
          <div className="relative mx-auto w-11/12 lg:max-w-[600px] md:mx-0 flex items-center justify-center">
            <div className="relative">
              <img
                src={image}
                alt="Students"
                width={550}
                height={400}
                loading="lazy"
                className="relative z-10 rounded-hero border border-hairline dark:border-slate-800 object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template