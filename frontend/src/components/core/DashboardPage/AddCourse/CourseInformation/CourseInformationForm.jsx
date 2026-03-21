import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi" 
import {  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
  addExamNote,
} from '../../../../../services/operations/courseDetailsAPI'
import toast from 'react-hot-toast';
import ChipInput from './ChipInput';
import Upload from '../Upload'
import RequirementsField from './RequirementsField'
import { MdNavigateNext } from "react-icons/md" 
import IconBtn from "../../../../common/IconBtn"
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constant"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])


  const getCategories = async () => {
    const toastId = toast.loading("Fetching Available categories")

    try {
      setLoading(true)
    
    const categories = await fetchCourseCategories()
    //console.log("This is my",categories)
    if (categories.length > 0) {
      // console.log("categories", categories)
      setCourseCategories(categories)
    }
    setLoading(false)
    } catch (error) {
     // toast.error("Not found")
      //console.log("This is my error",error)
    }
    toast.dismiss(toastId);
  } 

  useEffect(() => {
 
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

 //   handle next button click
 const onSubmit = async (data) => {
  // console.log(data)

  if (editCourse) {
    // const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    // console.log("now course:", course)
    // console.log("Has Form Changed:", isFormUpdated())
    if (isFormUpdated()) {
      const currentValues = getValues()
      const formData = new FormData()
      // console.log(data)
      formData.append("courseId", course._id)
      if (currentValues.courseTitle !== course.courseName) {
        formData.append("courseName", data.courseTitle)
      }
      if (currentValues.courseShortDesc !== course.courseDescription) {
        formData.append("courseDescription", data.courseShortDesc)
      }
      if (currentValues.coursePrice !== course.price) {
        formData.append("price", data.coursePrice)
      }
      if (currentValues.courseTags.toString() !== course.tag.toString()) {
        formData.append("tag", JSON.stringify(data.courseTags))
      }
      if (currentValues.courseBenefits !== course.whatYouWillLearn) {
        formData.append("whatYouWillLearn", data.courseBenefits)
      }
      if (currentValues.courseCategory._id !== course.category._id) {
        formData.append("category", data.courseCategory)
      }
      if (
        currentValues.courseRequirements.toString() !==
        course.instructions.toString()
      ) {
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements)
        )
      }
      if (currentValues.courseImage !== course.thumbnail) {
        formData.append("thumbnailImage", data.courseImage)
      }
      // console.log("Edit Form data: ", formData)
      setLoading(true)
      const result = await editCourseDetails(formData, token)
      setLoading(false)
      if (result) {
        if (data.examNote) {
          const noteData = new FormData()
          noteData.append("courseId", course._id)
          noteData.append("title", "Important Exam Note") // Default title
          noteData.append("pdf", data.examNote)
          await addExamNote(noteData, token)
        }
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
    } else {
      toast.error("No changes made to the form")
    }
    return
  }

  const formData = new FormData()
  formData.append("courseName", data.courseTitle)
  formData.append("courseDescription", data.courseShortDesc)
  formData.append("price", data.coursePrice)
  formData.append("tag", JSON.stringify(data.courseTags))
  formData.append("whatYouWillLearn", data.courseBenefits)
  formData.append("category", data.courseCategory)
  formData.append("status", COURSE_STATUS.DRAFT)
  formData.append("instructions", JSON.stringify(data.courseRequirements))
  formData.append("thumbnailImage", data.courseImage)  
  setLoading(true)
  const result = await addCourseDetails(formData, token)
  if (result) {
    dispatch(setStep(2))
    dispatch(setCourse(result))
  }
  setLoading(false)
}
  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className='space-y-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-8 shadow-2xl shadow-indigo-500/5 dark:shadow-none'>
      
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="courseTitle">
          Course Title <sup className="text-red-500 font-bold">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="e.g. Advanced Web Development"
          {...register("courseTitle", { required: true })}
          className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
             Required
          </span>
        )}
      </div>

       {/* Course Short Description */}
       <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="courseShortDesc">
          Description <sup className="text-red-500 font-bold">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Expound upon the core objectives..."
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-none min-h-[120px] w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
            Required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="coursePrice">
          Price (INR) <sup className="text-red-500 font-bold">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="0.00"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm"
          />
          <HiOutlineCurrencyRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-indigo-600 dark:text-indigo-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
            Required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="courseCategory">
          Category <sup className="text-red-500 font-bold">*</sup>
        </label>
        <div className="relative">
          <select
            {...register("courseCategory", { required: true })}
            defaultValue=""
            id="courseCategory"
            className="form-style w-full appearance-none cursor-pointer bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm pr-10"
          >
            <option value="" disabled>
              Select category...
            </option>
            {!loading &&
              courseCategories?.map((category, indx) => (
                <option key={indx} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
             <MdNavigateNext className="rotate-90 text-[18px]" />
          </div>
        </div>
        {errors.courseCategory && (
          <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
            Required
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Indexed Tags"
        name="courseTags"
        placeholder="Type a tag and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Thumbnail (Required)"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
        required={true}
      />

      {/* Exam Note Upload */}
      {editCourse && (
        <div className="flex flex-col space-y-4 rounded-2xl border border-indigo-600/10 bg-indigo-600/[0.02] dark:bg-indigo-400/[0.01] p-6">
          <div className="space-y-1 px-1">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
                RESOURCES
             </p>
             <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Exam Notes (PDF)
             </p>
          </div>
          <Upload
            name="examNote"
            label="Upload Note (Optional)"
            register={register}
            setValue={setValue}
            errors={errors}
            pdf={true}
            required={false}
          />
        </div>
      )}

      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="courseBenefits">
          Learning Outcomes (Optional)
        </label>
        <textarea
          id="courseBenefits"
          placeholder="What will students learn?"
          {...register("courseBenefits", { required: false })}
          className="form-style resize-none min-h-[120px] w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm"
        />
      </div>

      <RequirementsField
        name="courseRequirements"
        label="Prerequisites & Protocol"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-4 pt-8 border-t border-slate-100 dark:border-slate-800">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-xl bg-slate-100 dark:bg-slate-800 py-3 px-6 font-black text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
          >
            Skip to Builder
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next Stage" : "Commit Changes"}
          customClasses="px-8 py-3 rounded-xl shadow-2xl shadow-indigo-600/20 text-[10px] font-black uppercase tracking-widest"
        >
          <MdNavigateNext className="text-xl" />
        </IconBtn>
      </div>
    </form>
  )
}
