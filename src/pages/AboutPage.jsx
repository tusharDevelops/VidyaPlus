import React from 'react'
import FoundingStory from "../assets/Images/IMG_20240727_003411.jpg"
import BannerImage1 from "../assets/Images/abts1.jpg"
import BannerImage2 from "../assets/Images/abts2.jpg"
import BannerImage3 from "../assets/Images/abts3.jpg"
import HighlightText from '../components/core/HomePage/HighlightText'
import Quote from '../components/core/AboutPage/Quote'
import StatsBar from '../components/core/AboutPage/StatsBar'
import LearningGridSection from '../components/core/AboutPage/LearningGridSection'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer';

export default function AboutPage() {
  return (
    <div>
      {/* SECTION-1 */}
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
            Vidya+ is transforming online education by embracing the latest technologies. Our mission is to build a brighter future through innovative courses and a vibrant, supportive learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[90%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-2">
            <img src={BannerImage1} width={300} height={300} alt="" />
            <img src={BannerImage2} width={300} height={300} alt="" />
            <img src={BannerImage3} width={300} height={300} alt="" />
          </div>
        </div>
      </section>

      {/* SECTION-2 */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      {/* SECTION-3 */}
      <section>
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our founder grew up in a poor family, struggling with limited access to education and resources. Despite these challenges, he was determined to learn and succeed, studying under a kerosene lamp with borrowed books.

            Driven by a vision to transform education, he worked tirelessly to gain experience in the tech industry. His goal was to create Vidya+, an edtech platform designed to bridge the educational gap between privileged and underprivileged students.
              </p>
             
            </div>

            <div className=' mt-6'>
              <img
                src={FoundingStory}
                alt=""
                width={350}
                height={150}
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Vidya+ uses advanced technology to offer high-quality courses and build a vibrant learning community. Our mission goes beyond providing information—we aim to foster wisdom, critical thinking, and a deep understanding of subjects. We believe that education should nurture thoughtful individuals, preparing them for success in a complex world.

              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing.
              Join us in our mission to ensure every student, regardless of their background, can achieve their full potential through meaningful education.
              </p>
            </div>
          </div>
      </div>
      </section>

      {/* STATS_BAR*/}
      {/* <StatsBar/> */}
      {/* STATS_BAR_ENDS_HERE */}

      {/* SECTION-4 grid + form*/}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGridSection/>
        <ContactFormSection/>
      </section>

      {/* REVIEW_SECTION */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>

      {/* FOOTER  section*/}
      <Footer />







    </div>
  )
}
