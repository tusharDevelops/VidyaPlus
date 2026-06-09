import signupImg from "../assets/Images/signup.jpg"
import Template from "../components/core/Auth/Template"

function SignupPage() {
  return (
    <Template
      title="Join VidyaPlus Today!"
      description1="Start your journey to board excellence."
      description2="Get the best teachers and score top marks."
      image={signupImg}
      formType="signup"
    />
  )
}

export default SignupPage