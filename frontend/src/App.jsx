import { Routes, Route, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Home from "./pages/Home";
import Login from "./Login"; 
import { useState , useEffect } from "react";
import { FaPaw } from "react-icons/fa";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // 60% visible = active
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const linkClass = (id) => 
    `hover:text-pink-600 ${
      activeSection === id ? "text-pink-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-300 to-yellow-200 shadow-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            <FaPaw className="inline text-pink-600 mr-2" />
            Pet Grooming
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <HashLink smooth to="/#hero" className="hover:text-pink-600">Home</HashLink>
            <HashLink smooth to="/#services" className="hover:text-pink-600">Services</HashLink>
            <HashLink smooth to="/#gallery" className="hover:text-pink-600">Gallery</HashLink>
            <HashLink smooth to="/#testimonials" className="hover:text-pink-600">Testimonials</HashLink>
            <HashLink smooth to="/#about" className="hover:text-pink-600">About</HashLink>
            <HashLink smooth to="/#contact" className="hover:text-pink-600">Contact</HashLink>
            <Link to="/login" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
              Book Now
              <FaPaw className="inline ml-2" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-800 cursor-pointer focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

          {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-r from-pink-200 to-yellow-100 px-6 py-4 space-y-4">
            <HashLink smooth to="/#hero" onClick={toggleMenu} className="block hover:text-pink-600">Home</HashLink>
            <HashLink smooth to="/#services" onClick={toggleMenu} className="block hover:text-pink-600">Services</HashLink>
            <HashLink smooth to="/#gallery" onClick={toggleMenu} className="block hover:text-pink-600">Gallery</HashLink>
            <HashLink smooth to="/#testimonials" onClick={toggleMenu} className="block hover:text-pink-600">Testimonials</HashLink>
            <HashLink smooth to="/#about" onClick={toggleMenu} className="block hover:text-pink-600">About</HashLink>
            <HashLink smooth to="/#contact" onClick={toggleMenu} className="block hover:text-pink-600">Contact</HashLink>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} /> {/* fallback */}
      </Routes>
    </>
  )
}

export default App;