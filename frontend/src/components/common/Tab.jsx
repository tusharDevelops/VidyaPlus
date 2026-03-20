// export default function Tab({ tabData, field, setField }) {
//     return (
//       <div
//         style={{
//           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//         }}
//         className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max  "
//       >
//         {tabData.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setField(tab.type)}
//             className={`${
//               field === tab.type
//                 ? "bg-richblack-900 text-richblack-5"
//                 : "bg-transparent text-richblack-200"
//             } py-2 px-5 rounded-full transition-all duration-200`}
//           >
//             {tab?.tabName}
//           </button>
//         ))}
//       </div>
//     );
//   }

export default function Tab({ tabData, field, setField }) {
  return (
    <div className="tab-container my-6 h-14">
      <div className="animated-border-box-glow before:bg-indigo-500/30"></div>
      <div className="animated-border-box before:!bg-indigo-500">
        <div
          className="flex bg-slate-100 dark:bg-slate-800 p-1 gap-x-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-inner"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setField(tab.type)}
              className={`${
                field === tab.type
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/50 dark:border-slate-700/50 font-bold"
                  : "bg-transparent text-slate-500 dark:text-slate-400 font-medium"
              } py-2 px-6 rounded-full transition-all duration-300 active:scale-95`}
            >
              {tab?.tabName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
