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
    `hover:text-[var(--color-accent)] ${
      activeSection === id ? "text-[var(--color-primary)] font-semibold" : "text-[var(--color-card)]"
    }`;

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-[var(--color-bg)]">
            <FaPaw className="inline text-[var(--color-accent)] mr-2" />
            Pet Grooming
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-[var(--color-card)] font-medium">
            <HashLink smooth to="/#hero" className={linkClass("hero")}>Home</HashLink>
            <HashLink smooth to="/#services" className={linkClass("services")}>Services</HashLink>
            <HashLink smooth to="/#gallery" className={linkClass("gallery")}>Gallery</HashLink>
            <HashLink smooth to="/#testimonials" className={linkClass("testimonials")}>Testimonials</HashLink>
            <HashLink smooth to="/#about" className={linkClass("about")}>About</HashLink>
            <HashLink smooth to="/#contact" className={linkClass("contact")}>Contact</HashLink>
            <Link to="/login" 
                className="bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-primary)] 
                  text-[var(--color-card)] px-4 py-2 rounded hover:bg-gradient-to-b hover:from-[var(--color-primary)] 
                  hover:to-[var(--color-secondary)] transition duration-300">
              Book Now
              <FaPaw className="inline ml-2" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[var(--color-text)] font-bold cursor-pointer focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

          {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-[var(--color-card)] px-6 py-4 space-y-4">
            <HashLink smooth to="/#hero" onClick={toggleMenu} className="block hover:text-[var(--color-text)] transition duration-300">Home</HashLink>
            <HashLink smooth to="/#services" onClick={toggleMenu} className="block hover:text-[var(--color-text)] transition duration-300">Services</HashLink>
            <HashLink smooth to="/#gallery" onClick={toggleMenu} className="block hover:text-[var(--color-text)] transition duration-300">Gallery</HashLink>
            <HashLink smooth to="/#testimonials" onClick={toggleMenu} className="block hover:text-[var(--color-text)] transition duration-300">Testimonials</HashLink>
            <HashLink smooth to="/#about" onClick={toggleMenu} className="block hover:text-[var(--color-text)] transition duration-300">About</HashLink>
            <HashLink smooth to="/#contact" onClick={toggleMenu} className="block hover:text-[var(--color-text)] transition duration-300">Contact</HashLink>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-accent)] 
                  text-[var(--color-card)] px-4 py-2 rounded hover:bg-gradient-to-b hover:from-[var(--color-accent)] 
                  hover:to-[var(--color-secondary)] transition duration-300"
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