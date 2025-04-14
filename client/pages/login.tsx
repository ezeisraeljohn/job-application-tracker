import { useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";
import { AuthPayLoad, LoginResponse } from "../types";

export default function Login() {
  const [form, setForm] = useState<AuthPayLoad>({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<LoginResponse>("/auth/login", form);
      localStorage.setItem("token", res.data.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert(`Invalid credentials ${err}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}
