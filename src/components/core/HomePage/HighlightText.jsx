import React from 'react'

export default function HighlightText({text}) {
  return (
    <span className=' ml-2 bg-gradient-custom text-transparent bg-clip-text'>
      {" "}
      {text}
    </span>
  )
}

