import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", skills: "", companyName: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUser(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          skills: data.skills?.join(", ") || "",
          companyName: data.companyName || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setUser(data);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-white p-6">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 text-white flex flex-col gap-4">
      <h2 className="text-2xl font-bold">My Profile</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="p-2 rounded bg-slate-800"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 rounded bg-slate-800"
      />

      {user.role === "employee" && (
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="p-2 rounded bg-slate-800"
        />
      )}

      {user.role === "employer" && (
        <input
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className="p-2 rounded bg-slate-800"
        />
      )}

      <button
        onClick={handleSubmit}
        className="bg-amber-500 py-2 rounded mt-2"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;