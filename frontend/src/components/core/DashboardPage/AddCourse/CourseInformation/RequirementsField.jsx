import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function     RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]" htmlFor={name}>
        {label} <sup className="text-red-500 font-bold">*</sup>
      </label>
      <div className="flex flex-col items-start gap-4">
        <input
          type="text"
          id={name}
          value={requirement}
          placeholder="e.g. Basic understanding of JavaScript"
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full bg-white dark:bg-slate-900/50 rounded-2xl border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 font-bold text-sm"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="px-8 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1 active:translate-y-0 text-xs uppercase tracking-widest"
        >
          Add Requirement
        </button>
      </div>
      {requirementsList.length > 0 && (
        <div className="mt-6 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 shadow-inner">
          <ul className="space-y-4">
            {requirementsList.map((requirement, index) => (
              <li key={index} className="flex items-center justify-between gap-6 p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-white dark:border-slate-700 shadow-sm group hover:border-indigo-600/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                   <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight">{requirement}</span>
                </div>
                <button
                  type="button"
                  className="text-[10px] font-black text-slate-400 hover:text-red-500 transition-all uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 flex items-center gap-2"
                  onClick={() => handleRemoveRequirement(index)}
                >
                  <span className="w-4 h-[1px] bg-slate-200 dark:bg-slate-800 group-hover:bg-red-500 transition-colors"></span>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {errors[name] && (
        <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
          Specify at least one prerequisite for this course
        </span>
      )}
    </div>
  )
}