import { IoHome } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-20">
      <footer className="p-10 flex flex-col bg-[#1B2132] text-xl text-white">
        <div className="flex flex-col md:flex-row lg:flex-row justify-center gap-5 md:gap-8 lg:gap-14">
          <aside>
            <Link to="/">
              <img className="w-56" src="/image/logo.png" alt="logo" />
            </Link>
            <p>
              Discover your dream destinations with <br /> Contest Hub
            </p>
            <div className="flex flex-col gap-3 mt-5 text-white">
              <div className="flex items-center gap-3 text-base font-medium">
                <IoHome /> Chirirbandar, Dinajpur, Bangladesh
              </div>
              <div className="flex items-center gap-3 text-base font-medium">
                <FaPhoneVolume /> 01787448412
              </div>
              <div className="flex items-center gap-3 text-base font-medium">
                <IoIosMail /> itzmesojib@gmail.com
              </div>
            </div>
          </aside>
          <nav className="flex flex-col gap-2">
            <h6 className="text-2xl text-white font-semibold">Links</h6>
            <a className="hover:underline" href="#">About us</a>
            <a className="hover:underline" href="#">Services</a>
            <a className="hover:underline" href="#">Team</a>
            <a className="hover:underline" href="#">Gallery</a>
            <a className="hover:underline" href="#">Terms</a>
            <a className="hover:underline" href="#">Privacy Policy</a>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="text-2xl text-white font-semibold">Useful Links</h6>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/blogs" className="hover:underline">Blog</Link>
            <a className="hover:underline" href="#">FAQ</a>
            <a className="hover:underline" href="#">Testimonials</a>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </nav>
          <nav>
            <h6 className="text-2xl text-white font-semibold">Newsletter</h6>
            <p>
              Stay updated with curated content, <br /> expert insights, tips,
              and community <br />
              highlights in our informative <br /> newsletter. Subscribe now.
            </p>
            <form className="w-full flex flex-col gap-5 mt-5">
              <input
                type="text"
                placeholder="Your Email"
                className="input text-black w-full max-w-xs p-2 rounded"
                required
              />
              <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded w-full">
                Subscribe Now
              </button>
            </form>
          </nav>
        </div>
        <div className="w-full border-t mt-10 border-[#FFFFFF4D]"></div>
        <div className="flex flex-col-reverse mt-5 lg:flex-row text-center justify-center lg:justify-between">
          <p className="text-[#FFFFFFB3] font-semibold text-xs lg:text-base mt-10 lg:mt-0">
            © all rights reserved,{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/developersajadur">
             Sajadur Rahman
            </a>{" "}
            . 2024
          </p>
          <div className="flex text-base gap-5 justify-center text-white">
            <a href="#" className="hover:underline">Terms & condition</a>
            <a href="#" className="hover:underline">Team</a>
            <a href="#" className="hover:underline">Privacy policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
