import React, { useEffect } from 'react';
import HighlightText from './HighlightText';

const VismeForm = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (<>
  <div className=' text-center  text-richblack-800  mt-6 font-bold text-2xl md:text-3xl '>Here we are to <HighlightText text={" Reach you !"} /></div>
 <div
      className="visme_d"
      data-title="vidya+"
      data-url="90qw67ym-vidya"
      data-domain="forms"
      data-full-page="false"
      data-min-height="500px"
      data-form-id="84813"
      style={{ minHeight: '500px' }} // Ensure the container has a minimum height
    ></div>
  </>
   
  );
};

export default VismeForm;
