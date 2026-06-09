import { useEffect, useState } from "react";
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { useParams } from "react-router-dom";
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/common/Footer";
import CourseCard from "../components/core/Catalog/Course_Card";

export default function CatalogPage() {
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col font-sans">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-canvas border-b border-hairline py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-muted">
              <span>Home</span>
              <span>/</span>
              <span>Catalog</span>
              <span>/</span>
              <span className="text-ink">
                {catalogPageData?.data?.selectedCategory?.name}
              </span>
            </div>
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-[48px] font-bold tracking-tight">
                {catalogPageData?.data?.selectedCategory?.name}
              </h1>
              <p className="text-[18px] text-muted leading-relaxed">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h2 className="text-[36px] font-bold tracking-tight">Courses to get you started</h2>
              <p className="text-[18px] text-muted">Hand-picked selections for academic excellence.</p>
            </div>
            <div className="flex bg-surface p-1 rounded-full border border-hairline">
              <button
                className={`px-8 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 ${
                  active === 1
                    ? "bg-canvas text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
                onClick={() => setActive(1)}
              >
                Popular
              </button>
              <button
                className={`px-8 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 ${
                  active === 2
                    ? "bg-canvas text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
                onClick={() => setActive(2)}
              >
                Latest
              </button>
            </div>
          </div>
          <div className="rounded-[32px] border border-hairline p-8 md:p-12 bg-surface">
            <CourseSlider
              Courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-surface border-y border-hairline py-24 px-4 md:px-16 w-full">
          <div className="mx-auto max-w-screen-2xl">
            <div className="space-y-2 mb-12">
              <h2 className="text-[36px] font-bold tracking-tight">
                Top courses in {catalogPageData?.data?.differentCategory?.name}
              </h2>
              <p className="text-[18px] text-muted">Explore alternative paths for your learning journey.</p>
            </div>
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
          <div className="space-y-2 mb-12">
            <h2 className="text-[36px] font-bold tracking-tight">Frequently Bought</h2>
            <p className="text-[18px] text-muted">Highly-rated courses trusted by thousands of students.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <div key={i} className="bg-canvas p-6 md:p-8 rounded-[32px] border border-hairline hover:border-ink transition-colors duration-300">
                  <CourseCard course={course} Height={"h-[300px]"} />
                </div>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
