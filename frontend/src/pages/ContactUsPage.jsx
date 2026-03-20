import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactUsForm from "../components/common/ContactUsForm"

const ContactUsPage = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 min-h-screen">
      <div className="mx-auto pt-24 pb-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%] bg-white dark:bg-slate-800/50 p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
          <ContactUsForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-transparent">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>
      <Footer />
    </div>
  )
}

export default ContactUsPage;