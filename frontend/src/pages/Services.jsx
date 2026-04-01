import { useEffect, useState, memo } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { ScissorsIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { FaPaw } from "react-icons/fa";

// Skeleton loader component
function ServiceSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 rounded mb-4 mx-auto"></div>
      <div className="h-4 w-48 bg-gray-200 rounded mb-2 mx-auto"></div>
      <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
    </div>
  );
}

// Memoized service card
const ServiceCard = memo(({ service, icon }) => (
  <div
    key={service.id}
    className="bg-white text-center rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
  >
    <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-yellow-300 p-4">
      {icon}
      <h3 className="text-xl font-bold text-white">{service.name}</h3>
    </div>
    <div className="p-6">
      <p className="text-gray-700 text-lg italic mb-4">{service.description}</p>
      <p className="text-gray-700 mb-4">
        Price: <span className="font-semibold">${Number(service.price).toFixed(2)}</span>
      </p>
      <Link
        to="/login"
        className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition"
      >
        Book Now
      </Link>
    </div>
  </div>
));

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceIcons = {
    "Full Grooming": <ScissorsIcon className="h-6 w-6 text-white" />,
    "Spa Treatment": <SparklesIcon className="h-6 w-6 text-white" />,
    "Nail Trim": <FaPaw className="h-6 w-6 text-white" />,
  };

  useEffect(() => {
    api
      .get("/services")
      .then((res) => {
        console.log("Services API response:", res.data);
        setServices(res.data);
      })
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Our Services</h1>
      <p className="text-center text-gray-600 mb-12">
        Choose from our professional grooming options to keep your pets happy and healthy.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <ServiceSkeleton key={i} />)
          : Array.isArray(services) &&
            services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                icon={serviceIcons[service.name] || <FaPaw className="h-6 w-6 text-white" />}
              />
            ))}
      </div>
    </div>
  );
}