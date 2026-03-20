import React from 'react'

export default function HighlightText({text}) {
  return (
    <span className='relative inline-block mx-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black px-6 py-2 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105'>
      {text}
      <span className="absolute -top-2 -right-2 text-yellow-300 dark:text-yellow-400 text-lg select-none animate-pulse">✨</span>
      <span className="absolute -bottom-1 -left-2 text-cyan-300 text-xs select-none animate-bounce">→</span>
    </span>
  )
}

