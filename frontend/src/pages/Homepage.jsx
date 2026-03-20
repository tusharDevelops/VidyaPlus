import React, { useState, useEffect } from 'react'
import { FaArrowRight, FaVideo, FaQuestionCircle, FaBookOpen, FaAward, FaStar, FaTrophy, FaGraduationCap, FaPlay, FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from '../components/core/HomePage/Button'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'
import VismeForm from '../components/core/HomePage/Vismcontactform'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white dark:bg-slate-950 w-full h-auto flex flex-col overflow-hidden transition-colors duration-300">
      
      {/* HERO SECTION - MODERN & WOW */}
      <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-slate-900 to-slate-950'>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
        </div>

        {/* Content */}
        <div className='relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-32'>
          <div className='flex flex-col items-center justify-center text-center max-w-4xl'>
            
            {/* Status badge */}
            <div className="mb-8 inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span className="text-sm font-bold text-cyan-300">Now Admitting for 2026-27</span>
              </div>
            </div>

            {/* Main heading */}
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-6'>
              Your Path to <HighlightText text={"Excellence"} /> Starts Here
            </h1>

            {/* Subheading */}
            <p className='text-lg md:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed mb-10'>
              Transform your academic journey with India's premier online coaching. Expert faculty, personalized learning, and guaranteed results.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col md:flex-row justify-center gap-4 mb-12'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-2'>
                  <FaPlay className="text-sm" />
                  Start Free Trial
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/catalog/courses"}>
                <span className="text-white">Explore Courses</span>
              </CTAButton>
            </div>

            {/* Social proof */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 w-full max-w-2xl">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">50K+</div>
                <div className="text-sm text-gray-400">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">4.9/5</div>
                <div className="text-sm text-gray-400">Parent Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">99%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-cyan-400 font-semibold">Scroll to explore</span>
            <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* FLOATING CATEGORIES */}
      <div className="w-full py-16 bg-white dark:bg-slate-950 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Choose Your Path</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Select your class or preparation goal</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Foundation (1-8)', color: 'from-orange-500 to-red-500', link: '/catalog/foundation' },
              { label: 'Class 10 Boards', color: 'from-blue-500 to-cyan-500', link: '/catalog/class10' },
              { label: 'Class 12 Boards', color: 'from-purple-500 to-pink-500', link: '/catalog/class12' },
              { label: 'Olympiads & NTSE', color: 'from-green-500 to-emerald-500', link: '/catalog/olympiads' }
            ].map((item, idx) => (
              <Link key={idx} to={item.link} className="group">
                <div className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl text-white font-bold text-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 transform`}>
                  <div className="text-lg">{item.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* STATS & ACHIEVEMENTS SECTION */}
      <div className="w-full py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Award-Winning <HighlightText text={"Results"} />
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Our track record speaks for itself</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Toppers card */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 border border-yellow-200 dark:border-yellow-900/30">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Board Toppers</h3>
                  <p className="text-gray-600 dark:text-gray-400">5000+ students scoring 95%+</p>
                </div>
                <FaTrophy className="text-5xl text-yellow-500" />
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Ahaan S.', score: '99.2%', board: 'CBSE Class 12' },
                  { name: 'Priya K.', score: '98.8%', board: 'ICSE Class 10' }
                ].map((topper, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{topper.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{topper.board}</div>
                    </div>
                    <div className="text-2xl font-black text-yellow-600">{topper.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 border border-blue-200 dark:border-blue-900/30">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Student Impact</h3>
                  <p className="text-gray-600 dark:text-gray-400">Transforming academic outcomes</p>
                </div>
                <FaStar className="text-5xl text-blue-500" />
              </div>
              <div className="space-y-4">
                {[
                  { stat: '50,000+', label: 'Students Enrolled' },
                  { stat: '4.9/5', label: 'Parent Rating' },
                  { stat: '99%', label: 'Scoring Above 90%' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl">
                    <FaCheckCircle className="text-2xl text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-black text-slate-900 dark:text-white text-lg">{item.stat}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES BENTO GRID */}
      <div className='w-full py-20 bg-white dark:bg-slate-950'>
        <div className='max-w-7xl mx-auto px-4 md:px-8'>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Why Choose <HighlightText text={"VidyaPlus"} />?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive learning solutions designed for your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl mb-6">
                <FaVideo />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Interactive Live Classes</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Real-time two-way interaction with top educators. Never feel stuck—get instant clarity on concepts during live sessions with doubt-solving sessions.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Live daily classes</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Interactive Q&A</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-white text-xl mb-4">
                <FaQuestionCircle />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">24/7 Doubt Solving</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Upload problems anytime, get video solutions within minutes from expert mentors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl mb-4">
                <FaBookOpen />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Study Material</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                NCERT-aligned notes, worksheets, and mind-maps crafted by toppers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xl mb-4">
                <FaAward />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Test Series</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                All-India mocks with detailed analytics and performance insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CURRICULUM SECTION */}
      <div className="w-full relative z-20">
        <ExploreMore/>
      </div>

      {/* FACULTY SECTION */}
      <div className='w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-20 border-t border-slate-200 dark:border-slate-800'>
        <div className='max-w-7xl mx-auto px-4 md:px-8'>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Learn from <HighlightText text={"Top Educators"} />
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ex-IITians, NITians, and subject matter experts with proven track records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Faculty 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="relative px-6 pb-6">
                <div className="w-32 h-32 rounded-2xl mx-auto -mt-16 border-4 border-white dark:border-slate-800 bg-slate-300 overflow-hidden shadow-lg mb-4">
                  <img src="https://api.dicebear.com/5.x/initials/svg?seed=Rahul+Kapoor&backgroundColor=1e88e5" alt="Teacher" className="w-full h-full" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white text-center mb-1">Rahul Kapoor</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-sm text-center mb-3">Physics Expert | 15+ Yrs</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">Senior board examiner with dozens of state toppers mentored.</p>
              </div>
            </div>

            {/* Faculty 2 - Featured */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 transform md:-translate-y-4">
              <div className="absolute top-6 right-6 z-20">
                <div className="flex items-center gap-1 bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-black text-sm shadow-lg">
                  <FaStar /> 5.0
                </div>
              </div>
              <div className="h-40 bg-gradient-to-r from-yellow-500 to-amber-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="relative px-6 pb-6">
                <div className="w-36 h-36 rounded-2xl mx-auto -mt-18 border-4 border-white dark:border-slate-800 bg-slate-300 overflow-hidden shadow-xl mb-4">
                  <img src="https://api.dicebear.com/5.x/initials/svg?seed=Aisha+Khan&backgroundColor=f4511e" alt="Teacher" className="w-full h-full" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white text-center mb-1">Dr. Aisha Khan</h3>
                <p className="text-amber-600 dark:text-amber-400 font-bold text-sm text-center mb-3">Biology HOD | Ph.D. Scholar</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">Renowned for building deep concept foundations and exceptional student outcomes.</p>
              </div>
            </div>

            {/* Faculty 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group">
              <div className="h-32 bg-gradient-to-r from-green-600 to-teal-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="relative px-6 pb-6">
                <div className="w-32 h-32 rounded-2xl mx-auto -mt-16 border-4 border-white dark:border-slate-800 bg-slate-300 overflow-hidden shadow-lg mb-4">
                  <img src="https://api.dicebear.com/5.x/initials/svg?seed=Vikram+Singh&backgroundColor=43a047" alt="Teacher" className="w-full h-full" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white text-center mb-1">Vikram Singh</h3>
                <p className="text-green-600 dark:text-green-400 font-bold text-sm text-center mb-3">Math Wizard | M.Sc Gold Medalist</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">Makes complex theorems simple with innovative, engaging teaching methods.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <CTAButton active={false} linkto="/catalog/courses">
              See All Faculty
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Contact form section */}
      <div className="w-full pt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <VismeForm/>
      </div>

      {/* FOOTER */}
      <Footer/>

    </div>
  );
}
