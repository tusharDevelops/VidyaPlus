import React from 'react'

export default function HighlightText({text}) {
  return (
    <span className='relative inline-block px-4 py-1 mx-2 rounded-full bg-blue-50 dark:bg-blue-900/30 font-bold text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-800/50 transition-all'>
      {text}
      <span className="absolute -top-3 -right-3 text-yellow-400 dark:text-yellow-500 text-xl select-none animate-pulse">✦</span>
      <span className="absolute -bottom-2 -left-2 text-yellow-300 dark:text-yellow-600 text-sm select-none animate-bounce">✧</span>
    </span>
  )
}

