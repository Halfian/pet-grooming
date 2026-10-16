import { useEffect, useState } from "react";
import Services from "./Services";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import { Link } from "react-router-dom";
import { FaCat } from "react-icons/fa6";
import api from "../api";

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [])

  return (
    <div className="bg-(--color-bg)">
      {/* Hero Section */}
      <section id="hero" 
        className="h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cute-wallpaper.webp')" }}
      >
        <div className="bg-(--color-bg) p-8 rounded-lg shadow">
          <h1 className="text-4xl font-bold text-(--color-text) mt-10 mb-4">
            Pamper Your Pet with Love
          </h1>
          <p className="text-lg text-(--color-text) mb-6">
            Professional grooming services to keep your furry friends happy and healthy.
          </p>
          <Link
            to="/login"
            className="bg-(--color-secondary) text-(--color-card) px-8 py-3 rounded-lg shadow hover:bg-(--color-primary) transition duration-300"
          >
            Book Now
            <FaCat className="inline ml-2" />
          </Link>
        </div>
      </section>

      <section id="services" className="min-h-screen p-8 bg-(--color-bg)">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3).map((_, i) => (
              <div key={i} className="animate-pulse bg-(--color-text) h-40 rounded-lg"></div>
            ))]}
          </div>
        ) : (
          <Services services={services} />
        )}
      </section>

      <section id="gallery" className="min-h-screen p-8 bg-(--color-bg)">
        <Gallery />
      </section>

      <section id="testimonials" className="min-h-screen p-8 bg-(--color-bg)">
        <Testimonials />
      </section>

      {/* About Section */}
      <section id="about" 
        className="h-screen flex flex-col items-center justify-center text-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/pet1.webp')" }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-(--color-text)/10"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 bg-(--color-bg)/70 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-(--color-secondary) mb-6">About Us</h2>
          <p className="text-(--color-text) text-lg leading-relaxed">
            We are passionate pet lovers offering grooming services with care and compassion.
            Our mission is to make every pet feel comfortable, clean, and loved.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[5vh py-5 px-8 bg-(--color-bg) text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="text-(--color-text)">📍 Address, 📞 Phone, 💬 WhatsApp, 🌐 Social links</p>
      </section>
    </div>
  );
}