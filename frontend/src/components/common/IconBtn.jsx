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
        className={`flex items-center justify-center gap-x-2 rounded-lg py-2 px-5 font-semibold transition-all duration-200 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-lg"
        } ${
          outline 
            ? "border-2 border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50/10" 
            : "bg-gradient-to-r from-yellow-200 to-yellow-50 text-richblack-900 shadow-md hover:shadow-xl hover:-translate-y-0.5"
        } ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }
