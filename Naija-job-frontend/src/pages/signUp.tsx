import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", 
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! You can now login.");
      console.log("navigating now...");
      navigate("/login") ;
    } catch (err) {
      console.error("Signup error", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-white flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="p-2 rounded bg-slate-800"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 rounded bg-slate-800"
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="p-2 rounded bg-slate-800"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="p-2 rounded bg-slate-800"
      >
        <option value="employee">Employee</option>
        <option value="employer">Employer</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-amber-500 py-2 rounded mt-2"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;