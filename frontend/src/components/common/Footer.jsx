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

// Unused Plans removed for linting compliance
const Community = ["Discussion Forums", "Study Groups", "Events"];


const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 mt-12 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="mx-auto w-11/12 max-w-maxContent relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 pb-12 border-b border-slate-900">
          {/* Section 1 */}
          <div className="lg:w-[60%] flex flex-wrap gap-6 justify-between">
            <div className="w-full lg:w-[30%] space-y-6">
              <div className="flex items-center gap-2">
                 <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-lg font-black">V+</div>
                 <span className="text-lg font-black text-white tracking-tighter">Vidya<span className="text-indigo-500">+</span></span>
              </div>
              
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-200 font-black text-sm uppercase tracking-widest">Company</h3>
                <nav className="flex flex-col gap-3">
                  {["About", "Careers", "Affiliates"].map((ele, i) => (
                    <Link 
                      key={i} 
                      to={ele.toLowerCase()}
                      className="text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {ele}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="flex gap-4 pt-4">
                {[
                  { Icon: FaFacebook, link: "https://facebook.com" },
                  { Icon: FaGoogle, link: "https://google.com" },
                  { Icon: FaTwitter, link: "https://twitter.com" },
                  { Icon: FaYoutube, link: "https://youtube.com" }
                ].map(({ Icon, link }, i) => (
                   <a key={i} href={link} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300">
                      <Icon className="text-base" />
                   </a>
                ))}
              </div>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] space-y-6">
              <h3 className="text-slate-200 font-black text-sm uppercase tracking-widest">Resources</h3>
              <nav className="flex flex-col gap-3">
                {Resources.slice(0, 6).map((ele, index) => (
                  <Link 
                    key={index} 
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    {ele}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] space-y-8">
              <div className="space-y-6">
                <h3 className="text-slate-200 font-black text-sm uppercase tracking-widest">Support</h3>
                <Link to="/help-center" className="block text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors">
                  Help Center
                </Link>
              </div>
              <div className="space-y-6 pt-2">
                <h3 className="text-slate-200 font-black text-sm uppercase tracking-widest">Community</h3>
                <nav className="flex flex-col gap-3">
                  {Community.map((ele, index) => (
                    <Link 
                      key={index} 
                      to={ele.split(" ").join("-").toLowerCase()}
                      className="text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {ele}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[40%] flex flex-wrap gap-6 justify-between pt-8 lg:pt-0">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-full sm:w-[45%] space-y-6">
                <h3 className="text-slate-200 font-black text-sm uppercase tracking-widest">{ele.title}</h3>
                <nav className="flex flex-col gap-3">
                  {ele.links.map((link, index) => (
                    <Link 
                      key={index} 
                      to={link.link}
                      className="text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 text-xs font-black uppercase tracking-widest">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLocaleLowerCase()}
                className="text-slate-600 hover:text-white transition-colors"
              >
                {ele}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse text-lg">❤️</span>
            <a 
              href="https://github.com/tusharDevelops" 
              className="text-white hover:text-indigo-400 transition-colors ml-1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              tusharDevelops
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;