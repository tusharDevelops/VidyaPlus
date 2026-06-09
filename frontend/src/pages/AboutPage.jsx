import React from 'react';
import Footer from '../components/common/Footer';
import AboutImg1 from '../assets/Images/indian_students_library_1780996275100.png';
import AboutImg2 from '../assets/Images/indian_teacher_explaining_1780996288539.png';
import AboutImg3 from '../assets/Images/indian_school_building_1780996311223.png';
import TeacherImg1 from '../assets/Images/indian_teacher_portrait_1_1780996324609.png';
import TeacherImg2 from '../assets/Images/indian_teacher_portrait_2_1780996337249.png';
import TeacherImg3 from '../assets/Images/indian_teacher_portrait_3_1780996350467.png';

export default function AboutPage() {
  return (
    <div className="bg-canvas text-ink antialiased font-sans min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-canvas pt-32 pb-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[40px] md:text-[64px] font-bold mb-8 leading-[1.10] tracking-[-0.04em]">
              Empowering Students to Achieve Board Excellence
            </h1>
            <p className="text-[18px] text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              We provide complete school-level handholding to ensure every student succeeds. At VidyaPlus, your child's academic journey is our top priority.
            </p>
          </div>
        </section>

        {/* Image Grid / Story Banner */}
        <section className="px-4 md:px-16 mx-auto w-full max-w-screen-2xl pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img src={AboutImg1} alt="Indian Students studying" className="w-full h-80 object-cover rounded-[32px] bg-surface" />
            <img src={AboutImg2} alt="Indian Teacher explaining" className="w-full h-80 object-cover rounded-[32px] bg-surface md:-translate-y-8" />
            <img src={AboutImg3} alt="Indian School building" className="w-full h-80 object-cover rounded-[32px] bg-surface" />
          </div>
        </section>

        {/* Our Story */}
        <section className="border-t border-hairline py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <span className="text-brand-coral font-semibold text-[14px] uppercase tracking-widest">Our Story</span>
              <h2 className="text-[40px] font-bold mt-4 mb-6 tracking-[-0.02em]">Built for Indian Students</h2>
              <p className="text-[18px] text-muted leading-relaxed mb-6">
                VidyaPlus started with a simple idea: every child deserves top-quality education, no matter where they live. We saw that many students struggle with board exams and competitive tests like Olympiads simply because they lack the right guidance.
              </p>
              <p className="text-[18px] text-muted leading-relaxed">
                We brought together the best teachers in India to create an online platform that is easy to use, highly engaging, and focused entirely on student success. Today, thousands of parents trust us to guide their children to top ranks.
              </p>
            </div>
            <div className="flex-1 bg-surface p-12 rounded-[32px] border border-hairline relative">
              <span className="text-[80px] leading-none text-brand-coral absolute top-8 left-8 opacity-20">"</span>
              <p className="text-[24px] font-bold leading-relaxed relative z-10 text-ink mt-8">
                Our mission is to make high-quality coaching accessible, affordable, and effective for every student in India.
              </p>
              <p className="mt-8 text-[16px] font-semibold uppercase tracking-wider text-muted">
                — Founders, VidyaPlus
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Grid */}
        <section className="bg-surface py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl rounded-[48px] my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-canvas border border-hairline p-12 rounded-[32px] hover:border-ink transition-colors duration-300">
              <h3 className="text-[32px] font-bold mb-6">Our Mission</h3>
              <p className="text-[18px] text-muted leading-relaxed">
                To provide complete handholding for school students. We aim to clear every doubt, build strong fundamentals, and guide students step-by-step to score top marks in their Class 10 and 12 Board Exams.
              </p>
            </div>
            <div className="bg-canvas border border-hairline p-12 rounded-[32px] hover:border-ink transition-colors duration-300">
              <h3 className="text-[32px] font-bold mb-6">Our Vision</h3>
              <p className="text-[18px] text-muted leading-relaxed">
                To be India's most trusted online academy, where parents and students know they will receive the highest standard of teaching, transparent pricing, and measurable academic growth.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Our Teachers */}
        <section className="py-24 px-4 md:px-16 mx-auto w-full max-w-screen-2xl">
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-bold mb-4 tracking-[-0.02em]">Meet Our Teachers</h2>
            <p className="text-[18px] text-muted max-w-2xl mx-auto leading-relaxed">
              Learn from educators who have years of experience in helping students top their board exams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Teacher 1 */}
            <div className="bg-canvas border border-hairline p-8 rounded-[32px]">
              <img src={TeacherImg1} alt="Teacher" className="w-full h-64 object-cover rounded-[24px] mb-6 bg-surface" />
              <h4 className="text-[24px] font-bold mb-2">Rahul Sharma</h4>
              <p className="text-[14px] text-brand-blue font-semibold uppercase tracking-wider mb-4">Mathematics Expert</p>
              <p className="text-[16px] text-muted leading-relaxed">10+ years of experience teaching CBSE Class 10 &amp; 12. Known for making complex math problems easy to solve.</p>
            </div>
            {/* Teacher 2 */}
            <div className="bg-canvas border border-hairline p-8 rounded-[32px]">
              <img src={TeacherImg2} alt="Teacher" className="w-full h-64 object-cover rounded-[24px] mb-6 bg-surface" />
              <h4 className="text-[24px] font-bold mb-2">Priya Patel</h4>
              <p className="text-[14px] text-brand-magenta font-semibold uppercase tracking-wider mb-4">Science Head</p>
              <p className="text-[16px] text-muted leading-relaxed">Ex-scientist turned educator. Specializes in Physics and Chemistry for Class 12 Boards and Olympiads.</p>
            </div>
            {/* Teacher 3 */}
            <div className="bg-canvas border border-hairline p-8 rounded-[32px]">
              <img src={TeacherImg3} alt="Teacher" className="w-full h-64 object-cover rounded-[24px] mb-6 bg-surface" />
              <h4 className="text-[24px] font-bold mb-2">Ankit Verma</h4>
              <p className="text-[14px] text-brand-emerald font-semibold uppercase tracking-wider mb-4">English &amp; SST</p>
              <p className="text-[16px] text-muted leading-relaxed">Makes history and literature come alive. Focuses on writing skills necessary to secure 95+ in language exams.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
