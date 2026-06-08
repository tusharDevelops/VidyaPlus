import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAButton({active, linkto, children}) {
  return (
   <Link to={linkto}>
    <div className={`inline-flex items-center justify-center gap-2 ${active ? 'btn-primary' : 'btn-secondary'}`}>
      {children}
    </div>
   </Link>
  )
}
