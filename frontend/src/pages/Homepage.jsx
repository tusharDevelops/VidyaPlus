import React from 'react'
import { FaVideo, FaQuestionCircle, FaBookOpen, FaAward, FaChartLine, FaUserCheck, FaMedal } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'
import VismeForm from '../components/core/HomePage/Vismcontactform'

export default function HomePage() {

  return (
    <div className="bg-white dark:bg-slate-900 w-full h-auto flex flex-col overflow-hidden transition-colors duration-300">
      
      {/* HERO SECTION - MODERN & WOW */}
      <div className='relative w-full min-h-[90vh] flex items-center justify-center bg-canvas dark:bg-slate-900 transition-colors duration-500 pt-10'>
        
        {/* Content */}
        <div className='relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8 py-10 md:py-8'>
          <div className='flex flex-col items-center justify-center text-center max-w-[900px]'>
            
            {/* Main heading - 72px Display */}
            <h1 className='text-5xl md:text-7xl font-semibold text-ink dark:text-white leading-[1.10] tracking-[-2px] mb-6'>
              Master Your Exams with <span className="underline decoration-brand-coral decoration-4 underline-offset-8">VidyaPlus Academy</span>
            </h1>

            {/* Subheading */}
            <p className='text-lg md:text-xl text-slate-text dark:text-gray-300 font-medium max-w-2xl leading-relaxed mb-10'>
              Transform your academic journey with India's premier K-12 coaching center. Get complete school-level handholding, ace your board exams, and earn excellence certificates.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col md:flex-row justify-center gap-4 mb-16'>
              <Link to="/signup" className="btn-primary text-base px-8 py-3 flex items-center justify-center gap-2">
                Start Free Trial
              </Link>
              <Link to="/catalog/courses" className="btn-secondary text-base px-8 py-3 flex items-center justify-center gap-2">
                Explore Courses
              </Link>
            </div>

            {/* Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl mx-auto pt-8 border-t border-hairline dark:border-slate-800">
              <div className="text-center">
                <div className="text-4xl font-bold text-ink dark:text-white mb-2">50K+</div>
                <div className="text-sm text-steel dark:text-gray-400 font-medium">Students Mentored</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ink dark:text-white mb-2">4.9/5</div>
                <div className="text-sm text-steel dark:text-gray-400 font-medium">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ink dark:text-white mb-2">99%</div>
                <div className="text-sm text-steel dark:text-gray-400 font-medium">Board Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ink dark:text-white mb-2">500+</div>
                <div className="text-sm text-steel dark:text-gray-400 font-medium">Expert Courses</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
          <div className="flex flex-col items-center gap-2 animate-bounce opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-xs text-indigo-500 dark:text-cyan-400 font-bold uppercase tracking-wider">Scroll</span>
            <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-500 dark:from-cyan-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* VIBRANT PRODUCT MATRIX */}
      <div className="w-full py-24 bg-canvas dark:bg-slate-900 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-ink dark:text-white mb-4 tracking-tight">K-12 Course Matrix</h2>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar md:grid md:grid-cols-4 md:overflow-visible md:snap-none md:gap-6">
            {[
              { title: 'Foundation', subtitle: 'Class 1–8 Mastery', variant: 'product-card-coral', link: '/catalog/foundation', badge: 'POPULAR' },
              { title: 'Class 10', subtitle: 'Board Excellence', variant: 'product-card-blue', link: '/catalog/class10' },
              { title: 'Class 12', subtitle: 'JEE · NEET · Boards', variant: 'product-card-magenta', link: '/catalog/class12' },
              { title: 'Olympiads', subtitle: 'Competitive Exams', variant: 'product-card-emerald', link: '/catalog/olympiads' }
            ].map((item, idx) => (
              <Link key={idx} to={item.link} className={`group snap-center min-w-[280px] md:min-w-0 h-[380px] relative p-8 flex flex-col justify-end transition-transform duration-300 hover:-translate-y-2 ${item.variant}`}>
                {item.badge && (
                  <span className="absolute top-6 right-6 bg-white/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                  <p className="text-white/80 font-medium">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* STATS & ACHIEVEMENTS REMOVED - MOVED TO HERO */}

      {/* WHITE TILES GRID */}
      <div className='w-full pb-24 bg-canvas dark:bg-slate-900'>
        <div className='max-w-7xl mx-auto px-4 md:px-8'>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-ink dark:text-white mb-4">
              Why Choose <span className="underline decoration-brand-blue decoration-2 underline-offset-4">VidyaPlus Academy?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Live Coaching', desc: 'Interactive daily coaching sessions with top faculty', icon: <FaVideo /> },
              { title: 'Achievement Certificates', desc: 'Earn verified certificates for completing mock exams and milestones', icon: <FaAward /> },
              { title: 'Board-Aligned Material', desc: 'Access curated notes and NCERT-aligned resources anytime', icon: <FaBookOpen /> },
              { title: '24/7 Handholding', desc: 'Get instant doubt-solving help from expert mentors whenever you are stuck', icon: <FaQuestionCircle /> }
            ].map((feat, idx) => (
              <div key={idx} className="bg-canvas dark:bg-slate-900 p-8 rounded-3xl border border-hairline dark:border-slate-800 hover:shadow-lg transition-all">
                <div className="text-4xl text-ink dark:text-white mb-8">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-ink dark:text-white mb-3">{feat.title}</h3>
                <p className="text-steel dark:text-gray-400 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CURRICULUM SECTION */}
      <div className="w-full relative z-20">
        <ExploreMore/>
      </div>

      {/* HOW IT WORKS — STUDENT JOURNEY */}
      <div className='w-full py-24 bg-ink dark:bg-slate-900 relative overflow-hidden'>
          <div className='relative z-10 max-w-7xl mx-auto px-4 md:px-8'>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-brand-coral/20 text-brand-coral border border-brand-coral/30 mb-5 uppercase tracking-widest">Your Journey</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                4 Steps to Academic Excellence
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                A proven, structured roadmap designed around every school student's unique learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-14 left-[15%] right-[15%] h-px bg-gradient-to-r from-blue-500/30 via-indigo-500/50 to-green-500/30 z-0"></div>

            {[
              {
                step: '01', icon: <FaUserCheck className="text-3xl" />,
                title: 'Enroll & Assess',
                desc: 'Sign up and take a free diagnostic test. We pinpoint your strengths and build a personalised school study plan.',
                bgClass: 'bg-brand-blue', glow: 'shadow-sm',
              },
              {
                step: '02', icon: <FaVideo className="text-3xl" />,
                title: 'Learn from Experts',
                desc: 'Attend interactive live coaching sessions with top educators, participate in polls, and clarify concepts instantly.',
                bgClass: 'bg-brand-magenta', glow: 'shadow-sm',
              },
              {
                step: '03', icon: <FaChartLine className="text-3xl" />,
                title: 'Practice & Track',
                desc: 'Attempt chapter-wise tests, full board mock exams, and track your progress with analytics.',
                bgClass: 'bg-brand-coral', glow: 'shadow-sm',
              },
              {
                step: '04', icon: <FaMedal className="text-3xl" />,
                title: 'Achieve & Certify',
                desc: 'Crack board exams, earn your excellence certificate, and launch into a bright future.',
                bgClass: 'bg-brand-emerald', glow: 'shadow-sm',
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                <div className={`w-28 h-28 rounded-full ${item.bgClass} flex items-center justify-center text-white ${item.glow} mb-6 relative transition-transform group-hover:-translate-y-2 duration-300`}>
                  {item.icon}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black border-2 border-slate-700 flex items-center justify-center shadow-lg">
                    {item.step}
                  </span>
                </div>
                <div className="w-full rounded-2xl bg-slate-800/60 border border-slate-700/60 p-6 backdrop-blur-sm group-hover:border-slate-500 transition-all duration-300">
                  <h3 className="text-lg font-extrabold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
            </div>

            <div className="text-center mt-24">
              <div className="w-full bg-brand-coral rounded-hero p-12 md:p-16 text-center shadow-2xl flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to Excel? Start your free trial today.</h2>
                <Link to="/signup" className="btn-tertiary text-base text-brand-coral px-10 py-4 hover:text-brand-coral hover:bg-white/90 shadow-xl inline-flex">
                  Begin Now
                </Link>
              </div>
            </div>

          </div>
        </div>

      {/* Contact form section */}
      <div className="w-full pt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <VismeForm/>
      </div>

      {/* FOOTER */}
      <Footer/>

    </div>
  );
}
