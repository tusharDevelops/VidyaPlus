import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';

export default function HomePage() {
  return (
    <div className="bg-canvas text-ink antialiased font-sans">
      <main>
        {/* Hero Section */}
        <section className="relative bg-canvas pt-32 pb-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <h1 className="text-[40px] md:text-[72px] font-bold mb-8 leading-[1.10] tracking-[-0.04em]">
                Your Child's Success in Boards &amp; Olympiads Starts Here.
              </h1>
              <p className="text-[18px] text-muted max-w-xl mb-12 leading-relaxed">
                Top-quality coaching for Classes 6 to 12. Learn from India's best teachers, right from home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <button className="bg-ink text-canvas font-semibold text-[14px] px-8 py-4 rounded-full transition-all hover:opacity-90 active:scale-95">
                    Start Learning For Free
                  </button>
                </Link>
                <Link to="/catalog/foundation">
                  <button className="border border-ink text-ink font-semibold text-[14px] px-8 py-4 rounded-full transition-all hover:bg-surface active:scale-95">
                    View Courses
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full aspect-square relative rounded-[32px] overflow-hidden bg-surface">
              <img 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Students in classroom" 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
              />
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-hairline py-12 bg-canvas px-4 md:px-16">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-around gap-8 items-center text-center">
            <div>
              <div className="text-[36px] font-bold">50,000+</div>
              <div className="text-[14px] text-muted uppercase tracking-wider mt-1">Students</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-hairline"></div>
            <div>
              <div className="text-[36px] font-bold flex items-center justify-center gap-2">
                <span className="text-brand-coral text-4xl">★</span>
                4.9/5
              </div>
              <div className="text-[14px] text-muted uppercase tracking-wider mt-1">Rating</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-hairline"></div>
            <div>
              <div className="text-[36px] font-bold">100+</div>
              <div className="text-[14px] text-muted uppercase tracking-wider mt-1">Top Teachers</div>
            </div>
          </div>
        </section>

        {/* What We Offer: Bento Grid */}
        <section className="py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-brand-coral font-semibold text-[14px] uppercase tracking-widest">The Curriculum</span>
              <h2 className="text-[48px] font-bold mt-2 tracking-[-0.02em]">What We Offer</h2>
            </div>
            <Link to="/catalog/all" className="hidden md:flex items-center gap-2 text-ink font-semibold text-[14px] group">
              Explore all grades
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Foundation Card */}
            <Link to="/catalog/foundation" className="md:col-span-7 bg-brand-coral text-canvas rounded-[32px] p-8 md:p-12 flex flex-col justify-between min-h-[400px] group overflow-hidden relative">
              <div className="relative z-10">
                <span className="bg-white/20 px-4 py-2 rounded-full text-[14px] font-semibold">Grades 6-9</span>
                <h3 className="text-[36px] font-bold mt-8">Foundation Classes</h3>
                <p className="text-[16px] mt-4 max-w-xs opacity-90 leading-relaxed">Building the cognitive base for long-term academic excellence.</p>
              </div>
              <div className="relative z-10 flex mt-8">
                <button className="bg-white text-ink px-8 py-3 rounded-full font-semibold text-[14px] shadow-sm">Explore</button>
              </div>
              <span className="absolute -right-8 -bottom-8 text-[200px] opacity-10 group-hover:rotate-12 transition-transform duration-500">📚</span>
            </Link>

            {/* Class 10 Boards */}
            <Link to="/catalog/class-10" className="md:col-span-5 bg-brand-blue text-canvas rounded-[32px] p-8 md:p-12 flex flex-col justify-between min-h-[400px] group overflow-hidden relative">
              <div className="relative z-10">
                <span className="bg-white/20 px-4 py-2 rounded-full text-[14px] font-semibold">Target 100%</span>
                <h3 className="text-[36px] font-bold mt-8">Class 10 Boards</h3>
                <p className="text-[16px] mt-4 opacity-90 leading-relaxed">Comprehensive preparation with sample papers and revision tracks.</p>
              </div>
              <div className="relative z-10 mt-8">
                <button className="bg-white text-ink px-8 py-3 rounded-full font-semibold text-[14px] shadow-sm">Start Preparations</button>
              </div>
              <span className="absolute -right-4 -bottom-4 text-[160px] opacity-10 group-hover:scale-110 transition-transform duration-500">🎯</span>
            </Link>

            {/* Class 12 Science & Commerce */}
            <Link to="/catalog/class-12" className="md:col-span-5 bg-brand-magenta text-canvas rounded-[32px] p-8 md:p-12 flex flex-col justify-between min-h-[400px] group overflow-hidden relative">
              <div className="relative z-10">
                <span className="bg-white/20 px-4 py-2 rounded-full text-[14px] font-semibold">Pre-University</span>
                <h3 className="text-[36px] font-bold mt-8">Class 12 Prep</h3>
                <p className="text-[16px] mt-4 opacity-90 leading-relaxed">Science &amp; Commerce specialization with industry-expert mentors.</p>
              </div>
              <div className="relative z-10 mt-8">
                <button className="bg-white text-ink px-8 py-3 rounded-full font-semibold text-[14px] shadow-sm">View Stream</button>
              </div>
              <span className="absolute -right-4 -bottom-4 text-[160px] opacity-10 group-hover:-rotate-6 transition-transform duration-500">🎓</span>
            </Link>

            {/* Olympiads & NTSE */}
            <Link to="/catalog/olympiads" className="md:col-span-7 bg-brand-emerald text-canvas rounded-[32px] p-8 md:p-12 flex flex-col justify-between min-h-[400px] group overflow-hidden relative">
              <div className="relative z-10">
                <span className="bg-white/20 px-4 py-2 rounded-full text-[14px] font-semibold">Competitive Edge</span>
                <h3 className="text-[36px] font-bold mt-8">Olympiads &amp; NTSE</h3>
                <p className="text-[16px] mt-4 max-w-sm opacity-90 leading-relaxed">Advanced conceptual training for Math, Science, and Mental Ability examinations.</p>
              </div>
              <div className="relative z-10 mt-8">
                <button className="bg-white text-ink px-8 py-3 rounded-full font-semibold text-[14px] shadow-sm">Enroll Now</button>
              </div>
              <span className="absolute -right-8 -bottom-8 text-[200px] opacity-10 group-hover:translate-y-4 transition-transform duration-500">🏆</span>
            </Link>
          </div>
        </section>

        {/* Why Choose VidyaPlus? */}
        <section className="bg-surface py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl rounded-[48px] my-12">
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-bold mb-4 tracking-[-0.02em]">Why Choose VidyaPlus?</h2>
            <p className="text-[18px] text-muted max-w-2xl mx-auto leading-relaxed">We've combined pedagogical expertise with cutting-edge technology to create the ultimate learning ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-canvas border border-hairline p-8 md:p-10 rounded-[32px] hover:border-ink transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-8 bg-[#F3F4F6]">
                <span className="text-2xl">📺</span>
              </div>
              <h4 className="text-[28px] font-bold mb-4">Live Classes</h4>
              <p className="text-[16px] text-muted leading-relaxed">Interactive sessions where students can participate in real-time polls and live chats with teachers.</p>
            </div>
            
            <div className="bg-canvas border border-hairline p-8 md:p-10 rounded-[32px] hover:border-ink transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-8 bg-[#F3F4F6]">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="text-[28px] font-bold mb-4">Doubt Solving</h4>
              <p className="text-[16px] text-muted leading-relaxed">Dedicated 24/7 support to ensure no question goes unanswered. Connect with mentors instantly.</p>
            </div>
            
            <div className="bg-canvas border border-hairline p-8 md:p-10 rounded-[32px] hover:border-ink transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-8 bg-[#F3F4F6]">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="text-[28px] font-bold mb-4">Mock Tests</h4>
              <p className="text-[16px] text-muted leading-relaxed">Weekly performance evaluations and board-level mock exams with detailed analytics.</p>
            </div>
          </div>
        </section>

        {/* Massive Footer CTA */}
        <section className="px-4 md:px-16 mx-auto w-full max-w-screen-2xl pb-24 mt-12">
          <div className="bg-brand-coral rounded-[32px] p-12 md:p-24 text-canvas flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-[40px] md:text-[48px] font-bold leading-tight mb-6 tracking-[-0.02em]">Ready to score top marks? Join VidyaPlus today.</h2>
              <p className="text-[18px] opacity-90 leading-relaxed">Start your free trial today. No credit card required.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <Link to="/signup">
                <button className="bg-canvas text-ink font-semibold text-[16px] px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
                  Sign Up Now
                </button>
              </Link>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
