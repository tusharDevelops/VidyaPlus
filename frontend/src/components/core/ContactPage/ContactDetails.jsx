import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "info@vidyaplus.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office.",
    details: "Hanuman Nagar, Naibasti, Satna 485001",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri, 8am to 5pm",
    details: "+91 7879870967",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-8 rounded-[32px] bg-canvas p-10 lg:p-12 border border-hairline">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-4 p-6 rounded-[24px] bg-surface border border-hairline transition-all duration-300 group"
            key={i}
          >
            <div className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-canvas flex items-center justify-center text-ink border border-hairline">
                <Icon size={24} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[18px] font-bold text-ink tracking-tight">
                  {ele?.heading}
                </h1>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[14px] text-muted">{ele?.description}</p>
              <p className="text-[16px] font-semibold text-ink">{ele?.details}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails