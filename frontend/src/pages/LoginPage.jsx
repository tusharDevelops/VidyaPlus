import loginImg from "../assets/Images/login.jpg"
import Template from "../components/core/Auth/Template"

function LoginPage() {
  return (
    <Template
      title="Welcome Back!"
      description1="Ready to ace your exams?"
      description2="Let's continue your learning journey."
      image={loginImg}
      formType="login"
    />
  )
}

export default LoginPage