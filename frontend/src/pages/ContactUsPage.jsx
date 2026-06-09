import React from "react"
import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactUsForm from "../components/common/ContactUsForm"

const ContactUsPage = () => {
  return (
    <div className="bg-canvas text-ink font-sans min-h-screen flex flex-col">
      <main className="flex-grow pt-32 pb-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
        <div className="text-center mb-16">
          <h1 className="text-[40px] md:text-[64px] font-bold mb-4 tracking-[-0.04em]">
            Get in Touch
          </h1>
          <p className="text-[18px] text-muted max-w-2xl mx-auto leading-relaxed">
            We are here to help you. Whether you have questions about our courses or need assistance getting started, reach out to our team.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Details */}
          <div className="lg:w-[45%]">
            <ContactDetails />
          </div>

          {/* Contact Form */}
          <div className="lg:w-[55%] bg-canvas border border-hairline p-8 md:p-12 rounded-[32px]">
            <div className="mb-8">
              <h2 className="text-[32px] font-bold tracking-tight mb-2">Send us a Message</h2>
              <p className="text-[16px] text-muted">Fill out the form below and we will get back to you within 24 hours.</p>
            </div>
            <ContactUsForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactUsPage;