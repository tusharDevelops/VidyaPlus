import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@vidya+.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Hanuman nagar naibasti satna 485001",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "7879870967",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-8 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 p-10 lg:p-12 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/[0.02]">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 hover:border-indigo-500/30 hover:scale-[1.02] transition-all duration-500 group"
            key={i}
          >
            <div className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <Icon size={24} />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-0.5">Contact Method</p>
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  {ele?.heading}
                </h1>
              </div>
            </div>
            <div className="space-y-1 pl-1">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">{ele?.description}</p>
              <p className="text-base font-black text-slate-900 dark:text-white tracking-tight">{ele?.details}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails