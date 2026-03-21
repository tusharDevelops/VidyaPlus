import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchCourseCategories, deleteCategory } from "../../../../services/operations/courseDetailsAPI"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { RiDeleteBin6Line } from "react-icons/ri"

export default function ManageCategories() {
  const { token } = useSelector((state) => state.auth)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categoriesData = await fetchCourseCategories()
      if (categoriesData) {
        setCategories(categoriesData)
      }
      setLoading(false)
    }
    getCategories()
  }, [])

  const handleDeleteCategory = async (categoryId) => {
    const success = await deleteCategory({ categoryId }, token)
    if (success) {
      const remainingCategories = await fetchCourseCategories()
      setCategories(remainingCategories)
    }
    setConfirmationModal(null)
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="mb-10 space-y-3 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Manage Categories
        </h1>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400 max-w-2xl">
          Review existing categories or safely delete the ones where you control all associated courses.
        </p>
      </header>

      {loading ? (
        <div className="grid place-items-center min-h-[40vh]">
          <div className="spinner"></div>
        </div>
      ) : categories?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800">
           <p className="text-xl font-black text-slate-400">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <div key={category._id} className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-md p-8 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    📁
                  </div>
                </div>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "This will permanently delete the category and all associated courses you own.",
                      btn1Text: "Delete Category",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteCategory(category._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  title="Delete Category"
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm group-hover:opacity-100 opacity-60"
                >
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                {category.name}
              </h3>
              <p className="text-sm font-bold text-slate-500 line-clamp-3">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
