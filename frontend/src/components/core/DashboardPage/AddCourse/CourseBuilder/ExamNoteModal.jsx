import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import Upload from '../Upload'
import IconBtn from "../../../../common/IconBtn"
import { addExamNote } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../redux/slices/courseSlice"

export default function ExamNoteModal({  
    setModalData,
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("courseId", course._id)
        formData.append("title", data.noteTitle)
        if (data.examNotePdf) {
            formData.append("pdf", data.examNotePdf)
        } else {
            toast.error("Please add a PDF file")
            return
        }
        
        setLoading(true)
        
        const result = await addExamNote(formData, token)
        if (result) {
            dispatch(setCourse(result))
        }
        setModalData(null)
        setLoading(false)
    }

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-slate-900/60 backdrop-blur-md p-4'>
            <div className='my-10 w-full max-w-[700px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-500/10 overflow-hidden'>
                {/* Modal Header */}
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                            <span className="text-base sm:text-xl">📝</span>
                        </div>
                        <div>
                            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">
                                Add Exam Note
                            </p>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Supplemental Material</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => (!loading ? setModalData(null) : {})}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-700/50 text-slate-500 hover:text-red-500 transition-all"
                    >
                        <RxCross2 className="text-xl" />
                    </button>
                </div>

                {/* Modal Form */}
                <form className="space-y-6 sm:space-y-8 p-4 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
                    {/* Note Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="noteTitle">
                            Note Title <sup className="text-red-500 font-bold">*</sup>
                        </label>
                        <input
                            disabled={loading}
                            id="noteTitle"
                            placeholder="e.g. Chapter 1 Summary & Key Concepts"
                            {...register("noteTitle", { required: true })}
                            className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm"
                        />
                        {errors.noteTitle && (
                            <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                                Note title is required
                            </span>
                        )}
                    </div>

                    {/* Note PDF Upload */}
                    <div className="p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                        <Upload
                            name="examNotePdf"
                            label="PDF Document"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            pdf={true}
                        />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                        <IconBtn
                            disabled={loading}
                            text={loading ? "Uploading..." : "Save Note"}
                            customClasses="w-full sm:w-auto px-10 py-3 rounded-xl shadow-lg shadow-indigo-600/20 text-[10px] font-black uppercase tracking-widest flex justify-center"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
