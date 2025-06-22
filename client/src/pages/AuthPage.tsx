import { useState } from "react";
import { api } from "../utils/api";
export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Signing up with:", formData);
      try {
        const myDevice = navigator.userAgent;
        console.log("Here myDeivce", myDevice);
        const { email, password, username } = formData;
        const res = await api.post("/auth/register", {
          email,
          password,
          username,
        });
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Logging in with:", formData);
      // Login API call here
    }
  };
  console.log(import.meta.env);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
