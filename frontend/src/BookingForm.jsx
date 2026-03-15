import { useEffect, useState } from "react";
import api from "./api";
import AddPetForm from "./AddPetForm";

export default function BookingForm({ onBookingCreated }) {
    const [formData, setFormData] = useState({
        pet_id: "",
        service_id: "",
        date: ""
    });

    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);

    // Helper to get token once
    const token = localStorage.getItem("token");
    const authHeader = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const petsRes = await api.get("/pets", { headers: authHeader });
                setPets(petsRes.data);

                const servicesRes = await api.get("/services", { headers: authHeader });
                setServices(servicesRes.data);
            } catch (err) {
                console.error("Error fetching pets/services:", err);
            }
        };
        fetchData();   
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/bookings", formData, { headers: authHeader });
            alert("Booking created successfully!");
            if (onBookingCreated) await onBookingCreated();
            setFormData({ pet_id: "", service_id: "", date: "" });
        } catch (err) {
            console.error("Error creating booking:", err);
            alert(err.response?.data?.error || "Error creating booking");
        }
    };

    return (
        <div>
            {/* Add Pet Form */}
            <AddPetForm 
                onPetAdded={async () => {
                    try {
                        const res = await api.get("/pets", { headers: authHeader });
                        setPets(res.data);
                    } catch (err) {
                        console.error("error refreshing pets:", err);
                    }
                }} 
            />

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Booking</h2>
                
                {/* Pet */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Pet</label>
                    <select
                    name="pet_id"
                    value={formData.pet_id}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                    <option value="">Select Pet</option>
                    {Array.isArray(pets) && pets.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                    </select>
                </div>

                {/* Service */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Service</label>
                    <select
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                    <option value="">Select Service</option>
                    {Array.isArray(services) && services.map(s => (
                        <option key={s.id} value={s.id}>
                        {s.name} - ${Number(s.price).toFixed(2)}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                    <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-pink-700 transition"
                >
                    Create Booking
                </button>
            </form>
        </div>
    )
}