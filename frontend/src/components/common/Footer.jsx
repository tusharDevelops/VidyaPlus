import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";



// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms of Service"];

const Resources = [
  "Articles",
  "Blog",
  "Study Guides",
  "Practice Questions",
  "Documentation",
  "Projects",
  "Educational Videos",
  "Learning Modules",
];

const Plans = ["Membership Plans", "For Students", "School Programs"];

const Community = ["Discussion Forums", "Study Groups", "Events"];


const Footer = () => {
  return (
    <div className="bg-blue-1000 mt-9">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8 w-11/12 max-w-maxContent text-richblack-800 leading-6 mx-auto relative py-8 md:py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-4 md:pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-col sm:flex-wrap sm:flex-row justify-between lg:border-r lg:border-richblack-700 pl-0 sm:pl-3 lg:pr-5 gap-6 sm:gap-3">
            <div className="w-full sm:w-[48%] lg:w-[30%] flex flex-col gap-3 mb-4 sm:mb-7 lg:pl-0">
              {/* <img src={Logo} alt="" className="object-contain" /> */}
              <h1 className="text-richblack-50 font-semibold text-sm sm:text-base">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-xs sm:text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>

            <div className="w-full sm:w-[48%] lg:w-[30%] mb-4 sm:mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-sm sm:text-base">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-xs sm:text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-sm sm:text-base mt-4 sm:mt-7">
                Support
              </h1>
              <div className="text-xs sm:text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-full sm:w-[48%] lg:w-[30%] mb-4 sm:mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-sm sm:text-base">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-xs sm:text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-sm sm:text-base mt-4 sm:mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-xs sm:text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-col sm:flex-wrap sm:flex-row justify-between pl-0 sm:pl-3 lg:pl-5 gap-6 sm:gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-full sm:w-[48%] lg:w-[30%] mb-0 sm:mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-sm sm:text-base">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-xs sm:text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-800 mx-auto pb-8 md:pb-14 text-xs sm:text-sm gap-4">
        {/* Section 1 */}
        <div className="flex justify-center lg:justify-start lg:items-start items-center flex-wrap lg:flex-row gap-2 w-full">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700"
                  } px-2 cursor-pointer hover:text-richblack-50 transition-all duration-200`}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <a href="https://github.com/tusharDevelops" className="text-center lg:text-left" target="_blank" rel="noopener noreferrer">
            Made with ❤️ tusharDevelops
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
