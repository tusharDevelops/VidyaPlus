export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center justify-center gap-x-2 rounded-xl py-2 px-5 font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
          outline 
            ? "border-2 border-indigo-600/50 bg-transparent text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white" 
            : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
        } ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className="">{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }