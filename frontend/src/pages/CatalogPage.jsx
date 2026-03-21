import { useEffect,useState } from "react";
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { useParams } from "react-router-dom";
import {getCatalogPageData} from '../services/operations/PageAndComponentData'
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/common/Footer";
import CourseCard from "../components/core/Catalog/Course_Card";


export default function CatalogPage() {

  //const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(()=> {
    const getCategories = async() => {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = 
        res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        setCategoryId(category_id);
       
    }
    getCategories();
},[catalogName]);

  useEffect(()=>{
    const getCategoryDetails = async() => {
      try{
          const res = await getCatalogPageData(categoryId);
         // console.log("PRinting res: ", res);
          setCatalogPageData(res);
         // console.log(catalogPageData)
      }
      catch(error) {

      }
  }
  if(categoryId) {
      getCategoryDetails();
  }
  },[categoryId])


  return (
  <>
    {/* Hero Section */}
    <div className="box-content bg-slate-900 border-b border-indigo-500/20 px-4 relative overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <div className="mx-auto flex min-h-[300px] max-w-maxContentTab flex-col justify-center gap-6 lg:max-w-maxContent relative z-10 py-12">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            <span>Home</span>
            <span className="text-indigo-500">/</span>
            <span>Catalog</span>
            <span className="text-indigo-500">/</span>
            <span className="text-indigo-400">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-2xl font-black text-white tracking-tighter">
              {catalogPageData?.data?.selectedCategory?.name}
            </h1>
            <p className="max-w-[800px] text-lg font-medium text-slate-400 leading-relaxed italic border-l-4 border-indigo-600 pl-6 py-2">
              {catalogPageData?.data?.selectedCategory?.description}
            </p>
          </div>
        </div>
      </div>

       {/* Section 1 */}
       <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-8 lg:max-w-maxContent">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Courses to get you started</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Hand-picked selections for academic excellence.</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                active === 1
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-600/10"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
              onClick={() => setActive(1)}
            >
              Popular
            </button>
            <button
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                active === 2
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-600/10"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
              onClick={() => setActive(2)}
            >
              Latest
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 dark:border-slate-900 p-8 bg-slate-50/30 dark:bg-slate-900/10">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

        {/* Section 2 */}
        <div className="py-10 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800">
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 lg:max-w-maxContent">
            <div className="space-y-2 mb-12">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Top courses in {catalogPageData?.data?.differentCategory?.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Explore alternative paths for your learning journey.</p>
            </div>
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent">
        <div className="space-y-2 mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Frequently Bought</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Highly-rated courses trusted by thousands of students.</p>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <div key={i} className="group bg-white dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 backdrop-blur-md hover:border-indigo-500/50 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500">
                  <CourseCard course={course} Height={"h-[450px]"} />
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
  </>
  )
}
