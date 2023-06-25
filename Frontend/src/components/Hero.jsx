import { React } from "react";
import hero1 from "../../images/hero1.png";
import hero2 from "../../images/hero2.png";
// import logo1 from "../../images/logo1.png";
function Hero() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mt-10 text-white text-5xl">Hed-Sus-Manager</h1>
        {/* <img alt="Brand logo" className="w-6/12 self-center" src={logo1} /> */}
        <p className="mt-2 text-white text-2xl" align="center">A blockchain-powered platform for creators to showcase their projects and secure funding from sponsors.</p>
        <p className="mt-2 text-white text-2xl" align="center"> Empowering creativity, connecting sponsors, and enabling project realization.</p>
      </div>
      <div className="wrapper flex items-center justify-between px-[5rem] rounded-b-[5rem] w-[100%] h-[35rem] relative z-[3]">
        {/* left side */}
        <div className="headings flex flex-1 flex-col text-white items-center justify-center h-[100%] text-[1.5rem]">
          <p>Are you a creative individual with a groundbreaking project?</p>
          <p className="pb-4">
          Share your vision on Hed-Sus-Manager and attract potential sponsors. 
          </p>
        </div>
        {/* right side */}
        <div className="headings flex flex-1 flex-col text-white items-start justify-center h-[100%] text-[2rem]">
          <img alt="Hero 1" className="md:w-10/12 lg:w-8/12 self-center" src={hero2} />
        </div>
      </div>
      <div className="wrapper flex items-center justify-between px-[5rem] rounded-b-[5rem] w-[100%] h-[35rem] relative z-[3]">
        {/* left side */}
        <div className="headings flex flex-1 flex-col text-white items-start justify-center h-[100%] text-[2rem]">
          <img alt="Hero 2" className="md:w-11/12 lg:w-8/12 self-center" src={hero1} />
        </div>
        {/* right side */}
        <div className="headings flex flex-1 flex-col text-white items-center justify-center h-[100%] text-[1.5rem]">
          <p>Are you an Investor? Browse through a diverse range of innovative projects posted by talented creators. Find projects that resonate with your interests and passions.</p>
          <p className="pb-4">With Hed-Sus-Manager, you have the opportunity to support and fund the projects you believe in.</p>
        </div>
      </div>
    </>
  );
}

export default Hero;
