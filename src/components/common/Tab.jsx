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
    <div className="tab-container my-6 h-16">
      <div className="animated-border-box-glow"></div>
      <div className="animated-border-box">
        <div
          className="flex bg-richblack-800 p-1 gap-x-1 rounded-full"
          style={{
           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
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
                  ? "bg-richblack-900 text-richblack-5"
                  : "bg-transparent text-richblack-200"
              } py-2 px-5 rounded-full transition-all duration-200`}
            >
              {tab?.tabName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
