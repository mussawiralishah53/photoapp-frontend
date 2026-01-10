import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="viewer">Viewer</option>
            <option value="creator">Creator</option>
          </select>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Register
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link className="text-blue-600 underline" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
