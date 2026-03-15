import { useState } from "react";
import api from "./api";

export default function AddPetForm({ onPetAdded }) {
  const [pet, setPet] = useState({ name: "", type: "", breed: "" });

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pets", pet, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Pet added successfully!");
      setPet({ name: "", type: "", breed: "" });
      if (onPetAdded) { await onPetAdded() };
    } catch (err) {
      console.error(err);
      alert("Error adding pet");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 mt-10">
      <h3 className="text-lg text-center font-semibold">Add New Pet</h3>

      <input
        type="text"
        name="name"
        placeholder="Pet Name"
        value={pet.name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        name="type"
        placeholder="Type (Dog, Cat, etc.)"
        value={pet.type}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={pet.breed}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      {/* ✅ Submit button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white mb-5 py-2 rounded hover:bg-green-700"
      >
        Add Pet
      </button>
    </form>
  );
}