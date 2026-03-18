import { useEffect, useState } from 'react'
import api from "./api";
import BookingForm from "./BookingForm";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {  
  const [user, setUser] =  useState(null);
  const [bookings, setBookings] = useState([]);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    let payload = { email, password };
    if (isSignup) {
      const name = e.target.name.value;
      payload = { name, email, password }; // role defaults to "customer" in backend
    }

    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const res = await api.post(endpoint, payload);
      setUser(res.data.user); // backend should return { id, name, role, token }
      console.log("Logged in user:", res.data.user);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error("Authentication failed:", err);
      alert(err.response?.data?.error || "Invalid credentials or signup error");
    }
  };

  const fetchBookings = async () => {
    if (!user) return;
    try {
      const endpoint = user.role === "admin" ? "/bookings/admin" : "/bookings";
      const res = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Bookings data:", res.data);
      setBookings(user.role === "admin" ? res.data.bookings : res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await api.put(`/bookings/admin/${id}`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchBookings(); // refresh table
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Failed to update booking");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/admin/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchBookings(); // refresh table
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  if (!user) {
    // Render login/signup form
    return (
      <div className="max-w-md mx-auto mt-32 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h1>
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border rounded px-3 py-2"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-pink-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-pink-600 font-semibold cursor-pointer"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-pink-600 font-semibold cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    );
  }

  // Render dashboard after login/signup
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {user.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
      </h1>

      {user.role === "customer" && (
        <BookingForm onBookingCreated={fetchBookings} />
      )}

      <h2 className="text-xl font-semibold mt-6">
        {user.role === "admin" ? "All Bookings" : "My Bookings"}
      </h2>
      <table className="w-full mt-4 border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Pet</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            {user.role === "admin" && (
              <th className="border px-4 py-2">Customer</th>
            )}
            {user.role === "admin" && (
              <th className="border px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
            {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="border px-4 py-2">{b.pet_name}</td>
                  <td className="border px-4 py-2">{b.service_name}</td>
                  <td className="border px-4 py-2">
                    {new Date(b.booking_date).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-white text-center ${
                        b.status === "pending"
                          ? "bg-yellow-500"
                          : b.status === "completed"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  {user.role === "admin" && (
                    <td className="border px-4 py-2">{b.customer_name || "N/A"}</td>
                  )}
                  {user.role === "admin" && (
                    <td className="border px-4 py-2 space-x-2 text-center">
                      <button
                        onClick={() => updateBookingStatus(b.id, "completed")}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateBookingStatus(b.id, "canceled")}
                        className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteBooking(b.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );

}

export default Login;