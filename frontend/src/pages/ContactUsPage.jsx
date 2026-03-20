import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactUsForm from "../components/common/ContactUsForm"

const ContactUsPage = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto pt-32 pb-32 flex w-11/12 max-w-maxContent flex-col justify-between gap-16 lg:flex-row relative z-10">
        {/* Contact Details */}
        <div className="lg:w-[45%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[55%] bg-white dark:bg-slate-900/40 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-indigo-500/5 border border-slate-200 dark:border-slate-800 backdrop-blur-xl relative group">
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-600/5 rounded-full -ml-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10">
             <div className="mb-10">
               <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-3">SECURE CHANNEL</p>
               <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Establish Communication</h2>
               <p className="text-slate-500 dark:text-slate-400 font-bold mt-2">Our technical advisors are standing by to assist with your academic transition.</p>
             </div>
             <ContactUsForm />
          </div>
        </div>
      </div>

      {/* REVIEW_SECTION */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-12 bg-transparent pb-32">
        <div className="space-y-4 text-center">
           <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">USER TESTIMONIALS</p>
           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
             Global Scholarly Review
           </h1>
        </div>
        {/* <ReviewSlider /> */}
      </div>
      <Footer />
    </div>
  )
}

export default ContactUsPage;