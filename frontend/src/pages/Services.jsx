import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { ScissorsIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { FaPaw } from "react-icons/fa";

export default function Services() {
    const [services, setServices] = useState([]);
    const serviceIcons = {
        "Full Grooming": <ScissorsIcon className="h-6 w-6 text-white" />,
        "Spa Treatment": <SparklesIcon className="h-6 w-6 text-white" />,
        "Nail Trim": <FaPaw className="h-6 w-6 text-white" />,
        };


    useEffect(() => {
        api.get("/services")
            .then(res => {
                console.log("Services API response:", res.data);
                setServices(res.data);
            })
            .catch(err => console.error("Error fetching services:", err))
    }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Our Services</h1>
      <p className="text-center text-gray-600 mb-12">
        Choose from our professional grooming options to keep your pets happy and healthy.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {Array.isArray(services) && services.map(service => (
            <div
            key={service.id}
            className="bg-white text-center rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
            >
            {/* Card Header */}
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-yellow-300 p-4">
                {serviceIcons[service.name] || <FaPaw className="h-6 w-6 text-white" />}
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
            </div>

            {/* Card Body */}
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
        ))}
        </div>
    </div>

  );
}