import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registered! Now login.");
      navigate("/login");
    } else {
      alert(data.msg || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200">
          Register
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
