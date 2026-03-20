import { useEffect, useState } from "react"
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
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
                {/* Modal Header */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                       Adding Exam Note
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                {/* Modal Form */}
                <form className="space-y-8 px-8 py-10" onSubmit={handleSubmit(onSubmit)}>
                    {/* Note Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="noteTitle">
                            Note Title <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            disabled={loading}
                            id="noteTitle"
                            placeholder="Enter Note Title (e.g., Chapter 1 Summary)"
                            {...register("noteTitle", { required: true })}
                            className="form-style w-full"
                        />
                        {errors.noteTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Note title is required
                            </span>
                        )}
                    </div>

                    {/* Note PDF Upload */}
                    <Upload
                        name="examNotePdf"
                        label="Exam Note (PDF)"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        pdf={true}
                    />

                    <div className="flex justify-end">
                        <IconBtn
                            disabled={loading}
                            text={loading ? "Loading.." : "Save"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
