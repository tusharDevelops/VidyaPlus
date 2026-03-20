import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createCategory } from '../../../../services/operations/courseDetailsAPI'
import IconBtn from '../../../common/IconBtn'

export default function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const { token } = useSelector((state) => state.auth)

  const onSubmit = async (data) => {
    const result = await createCategory(data, token)
    if (result) {
      reset()
    }
  }

  return (
    <div className="flex w-full items-start gap-x-6">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          Add Category
        </h1>
        <div className="flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="name">
                Category Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                id="name"
                placeholder="Enter Category Name"
                {...register("name", { required: true })}
                className="form-style w-full"
              />
              {errors.name && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Category name is required
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="description">
                Category Description <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="description"
                placeholder="Enter Category Description"
                {...register("description", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.description && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Category description is required
                </span>
              )}
            </div>

            <div className="flex justify-end gap-x-2">
              <IconBtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>

      {/* Info Tips */}
      <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
        <p className="mb-8 text-lg text-richblack-5">⚡ Category Creation Tips</p>
        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
          <li>Categories help students find your courses easily.</li>
          <li>Choose a clear and descriptive name for the category.</li>
          <li>The description should explain what kind of courses belong here.</li>
          <li>Instructors now have full control over category management.</li>
          <li>Be careful with naming to maintain platform consistency.</li>
        </ul>
      </div>
    </div>
  )
}
