import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Viewer"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerUser(form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-end relative overflow-hidden"
      style={{
        backgroundImage: `url('https://image.shutterstock.com/image-photo/heavy-equipment-vehicles-including-excavator-bulldozer-260nw-2704606687.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Blurred Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-4xl font-bold">
          <span className="text-red-600">AI</span>{" "}
          <span className="text-white drop-shadow-lg">FLEET</span>
        </h1>
      </div>

      {/* Glassmorphism Register Card */}
      <div className="relative z-10 mr-8 md:mr-16 w-full max-w-md">
        <div className="backdrop-blur-md bg-white/20 shadow-xl rounded-2xl p-8 border border-white/30">
          
          <h2 className="text-4xl font-bold text-center mb-8 text-black drop-shadow-lg">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black/50 focus:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black/50 focus:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <select
                name="role"
                className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black/50 focus:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                style={{
                  colorScheme: 'dark'
                }}
                onChange={handleChange}
              >
                <option value="Viewer" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Viewer</option>
                <option value="Admin" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Admin</option>
              </select>
            </div>

            {error && (
              <div className="text-red-300 text-sm text-center bg-red-500/20 p-3 rounded-lg border border-red-400/30">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-300 text-sm text-center bg-green-500/20 p-3 rounded-lg border border-green-400/30">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all duration-200 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-600/50"
            >
              Register
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-white/90">
            Already have an account?{" "}
            <span
              className="text-red-300 cursor-pointer font-semibold hover:text-red-400 transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;