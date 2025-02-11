import signupImg from "../assets/Images/signup.jpg"
import Template from "../components/core/Auth/Template"

function SignupPage() {
  return (
    <Template
     title="Join the Vidya+ Learning Revolution!"
      description1="Empower your future with knowledge and skills that last a lifetime."
      description2="Innovative education to unlock your full potential."
      image={signupImg}
      formType="signup"
    />
  )
}

export default SignupPage