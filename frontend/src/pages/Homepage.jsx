import React from 'react'
import { FaArrowRight, FaVideo, FaQuestionCircle, FaBookOpen, FaAward, FaStar, FaTrophy, FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from '../components/core/HomePage/Button'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'
import VismeForm from '../components/core/HomePage/Vismcontactform'

export default function HomePage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 w-screen h-auto flex flex-col font-inter transition-colors duration-300">
      
      {/* PREMIUM HERO SECTION (Responsive Light/Dark Mode) */}
      <div className='flex flex-col w-full relative content-center items-center pt-28 pb-32 px-5 bg-blue-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300'>
          
          <div className='flex flex-col items-center justify-center text-center max-w-[1000px] z-10'>
              <div className="bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-5 py-2 rounded-full font-bold text-sm mb-8 border border-yellow-300 dark:border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] dark:shadow-[0_0_15px_rgba(234,179,8,0.2)] flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
                  Admissions Open for 2026-27 Academic Year
              </div>

              <h1 className='text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight'>
                  India's Most Trusted Coaching for <HighlightText text={"Board Excellence"} />
              </h1>

              <p className='mt-8 text-slate-600 dark:text-slate-300 font-medium text-lg md:text-xl max-w-[800px] leading-relaxed'>
                  Building unbreakable academic foundations from Class 1 to 12. Join the revolution in school education with structured live classes, top expert faculty, and a proven legacy of Board Toppers.
              </p>

              <div className='flex justify-center gap-5 mt-10'>
                  <CTAButton active={true} linkto={"/signup"}>
                     <div className='flex items-center gap-2'>
                        Book a Free Masterclass
                        <FaArrowRight className="text-sm" />
                     </div>
                  </CTAButton>
                  <CTAButton active={false} linkto={"/catalog/courses"}>
                      <span className="text-slate-800 dark:text-white">Explore Subjects</span>
                  </CTAButton>
              </div>

              {/* Authority Trust Subtext */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2"><FaGraduationCap className="text-yellow-600 dark:text-yellow-500 text-xl" /> 50,000+ Enrolled</div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700"></div>
                  <div className="flex items-center gap-2"><FaStar className="text-yellow-600 dark:text-yellow-500 text-xl" /> 4.9/5 Parent Rating</div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700"></div>
                  <div className="flex items-center gap-2"><FaTrophy className="text-yellow-600 dark:text-yellow-500 text-xl" /> 99% Scoring Above 90%</div>
              </div>
          </div>

          {/* Glowing Background Orbs for Hero */}
          <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-300/40 dark:bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] bg-yellow-300/30 dark:bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      </div>

      {/* TARGET EXAMS STRIP */}
      <div className="w-full relative z-20 -mt-16 mb-16 px-5">
          <div className="max-w-[1100px] mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-900/10 dark:shadow-blue-900/40 p-6 md:p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-slate-900 dark:text-white font-bold text-xl md:text-2xl whitespace-nowrap">
                  What are you preparing for?
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-end w-full">
                  <Link to="/catalog/class10" className="px-5 py-2.5 rounded-full font-bold text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors">Class 10 Boards</Link>
                  <Link to="/catalog/class12" className="px-5 py-2.5 rounded-full font-bold text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-colors">Class 12 Boards</Link>
                  <Link to="/catalog/foundation" className="px-5 py-2.5 rounded-full font-bold text-sm bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 transition-colors">Foundation (1-8)</Link>
                  <Link to="/catalog/olympiads" className="px-5 py-2.5 rounded-full font-bold text-sm bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-colors">Olympiads & NTSE</Link>
              </div>
          </div>
      </div>

      {/* RESULTS / HALL OF FAME BANNER (Responsive Light/Dark Mode) */}
      <div className="w-full bg-blue-50 dark:bg-gradient-to-r dark:from-blue-900 dark:to-slate-900 py-16 px-5 relative overflow-hidden my-10 border-y border-blue-200 dark:border-blue-800 transition-colors duration-300">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-10 mix-blend-overlay"></div>
          <div className="max-w-maxContent mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-slate-900 dark:text-white md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                      <FaTrophy className="text-yellow-600 dark:text-yellow-400 text-4xl" />
                      <h2 className="text-4xl font-black">Our Board Toppers</h2>
                  </div>
                  <p className="text-slate-600 dark:text-blue-100 text-lg leading-relaxed">
                      Vidya+ students consistently dominate the top percentiles in CBSE and ICSE boards across the country. 
                      Preparing the ultimate base for a brilliant future.
                  </p>
                  <div className="mt-6 font-bold text-blue-700 dark:text-yellow-400 text-xl">
                      Over 5,000+ Students Scoring 95%+ in 2025
                  </div>
              </div>
              <div className="flex gap-4 md:w-1/2 justify-end">
                  {/* Result Card 1 */}
                  <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-white/20 text-center w-full max-w-[180px] shadow-sm">
                      <div className="w-20 h-20 rounded-full mx-auto bg-slate-300 mb-3 overflow-hidden border-2 border-yellow-500 dark:border-yellow-400">
                          <img src={`https://api.dicebear.com/5.x/initials/svg?seed=Ahaan&backgroundColor=00897b`} alt="Topper" />
                      </div>
                      <h3 className="text-slate-900 dark:text-white font-bold">Ahaan S.</h3>
                      <p className="text-yellow-600 dark:text-yellow-300 font-black text-lg">99.2%</p>
                      <p className="text-slate-500 dark:text-blue-200 text-sm font-semibold">CBSE Class 12</p>
                  </div>
                  {/* Result Card 2 */}
                  <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-white/20 text-center w-full max-w-[180px] hidden sm:block shadow-sm">
                      <div className="w-20 h-20 rounded-full mx-auto bg-slate-300 mb-3 overflow-hidden border-2 border-yellow-500 dark:border-yellow-400">
                          <img src={`https://api.dicebear.com/5.x/initials/svg?seed=Priya&backgroundColor=e53935`} alt="Topper" />
                      </div>
                      <h3 className="text-slate-900 dark:text-white font-bold">Priya K.</h3>
                      <p className="text-yellow-600 dark:text-yellow-300 font-black text-lg">98.8%</p>
                      <p className="text-slate-500 dark:text-blue-200 text-sm font-semibold">ICSE Class 10</p>
                  </div>
              </div>
          </div>
      </div>

      {/* WHY CHOOSE US - FEATURES GRID */}
      <div className='w-full py-16 transition-colors duration-300'>
          <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center'>
              
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Why Choose <HighlightText text={"Vidya+"} />?</h2>
                  <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-[600px] mx-auto">We provide a holistic learning environment designed to build strong fundamentals and ensure continuous progress.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                  {/* Feature 1 */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-2 group">
                      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <FaVideo />
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Interactive Live Classes</h3>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">Real-time two-way interaction with top educators. Clear your concepts instantly during the live sessions.</p>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-2 group">
                      <div className="w-16 h-16 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-3xl mb-6 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
                          <FaQuestionCircle />
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">24/7 Doubt Solving</h3>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">Stuck on a problem at night? Upload a photo of your question and get video solutions from experts within minutes.</p>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-2 group">
                      <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-3xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <FaBookOpen />
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Comprehensive Material</h3>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">Access to premium NCERT-aligned notes, chapter-wise worksheets, and revision mind-maps crafted by toppers.</p>
                  </div>

                  {/* Feature 4 */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-2 group">
                      <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-3xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <FaAward />
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">All-India Test Series</h3>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">Benchmark your performance with weekly mock tests and receive detailed AI-driven analytical reports.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* CURRICULUM SECTION */}
      <div className="w-full relative z-20 my-10">
          <ExploreMore/>
      </div>

      {/* STAR FACULTY SECTION */}
      <div className='w-full bg-slate-100 dark:bg-slate-900/50 py-20 border-t border-slate-200 dark:border-slate-800 my-10'>
          <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center'>
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white">Learn from <HighlightText text={"India's Top Educators"} /></h2>
                  <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-[700px] mx-auto">Our star faculty consists of ex-IITians, NITians, and doctors who have produced top ranks year after year.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-[1000px] mx-auto">
                  {/* Faculty 1 */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 text-center relative group">
                      <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                      <div className="w-28 h-28 rounded-full mx-auto -mt-14 border-4 border-white dark:border-slate-800 bg-slate-300 overflow-hidden relative z-10">
                          <img src="https://api.dicebear.com/5.x/initials/svg?seed=Rahul+Kapoor&backgroundColor=1e88e5" alt="Teacher" />
                      </div>
                      <div className="p-6 pt-4">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Rahul Kapoor</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-4">Physics Expert | 15+ Yrs Exp.</p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">Senior Board Examiner. Mentored dozens of State Board Toppers.</p>
                      </div>
                  </div>

                  {/* Faculty 2 */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 text-center relative group transform md:-translate-y-6">
                      <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-black px-3 py-1 rounded-full text-slate-900 z-20 flex items-center gap-1 shadow-md">
                          <FaStar/> 5.0 Rating
                      </div>
                      <div className="h-28 bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                      <div className="w-32 h-32 rounded-full mx-auto -mt-16 border-4 border-white dark:border-slate-800 bg-slate-300 overflow-hidden relative z-10">
                          <img src="https://api.dicebear.com/5.x/initials/svg?seed=Aisha+Khan&backgroundColor=f4511e" alt="Teacher" />
                      </div>
                      <div className="p-6 pt-4">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Dr. Aisha Khan</h3>
                          <p className="text-amber-600 dark:text-amber-400 font-bold text-sm mb-4">Biology HOD | Ph.D. Scholar</p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">Renowned for teaching deep concepts to build unstoppable foundations.</p>
                      </div>
                  </div>

                  {/* Faculty 3 */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 text-center relative group">
                      <div className="h-24 bg-gradient-to-r from-green-600 to-teal-400"></div>
                      <div className="w-28 h-28 rounded-full mx-auto -mt-14 border-4 border-white dark:border-slate-800 bg-slate-300 overflow-hidden relative z-10">
                          <img src="https://api.dicebear.com/5.x/initials/svg?seed=Vikram+Singh&backgroundColor=43a047" alt="Teacher" />
                      </div>
                      <div className="p-6 pt-4">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Vikram Singh</h3>
                          <p className="text-green-600 dark:text-green-400 font-bold text-sm mb-4">Math Wizard | M.Sc Gold Medalist</p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">Simplifies the toughest board theorems into 2-step enjoyable puzzles.</p>
                      </div>
                  </div>
              </div>

              <div className="mt-12">
                  <CTAButton active={false} linkto="/catalog/courses">
                      See All Faculty
                  </CTAButton>
              </div>
          </div>
      </div>

      <div className="w-full pt-16 border-t border-slate-200 dark:border-slate-800 mt-10">
          <VismeForm/>
      </div>

      {/* FOOTER */}
      <Footer/>

    </div>
  );
}
