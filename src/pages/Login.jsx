import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { decodeJWT } from "../utils/jwtDecoder";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);
      console.log("LOGIN DATA:", data);
      
      // Decode JWT to extract role
      const decoded = decodeJWT(data.access_token);
      const role = decoded?.role || data.role || "Viewer";
      
      login(data.access_token, {
        email: email,
        role: role
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
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

      {/* Glassmorphism Login Card */}
      <div className="relative z-10 mr-8 md:mr-16 w-full max-w-md">
        <div className="backdrop-blur-md bg-white/20 shadow-xl rounded-2xl p-8 border border-white/30">
          
          <h2 className="text-4xl font-bold text-center mb-8 text-black drop-shadow-lg">
            AI Fleet Login
          </h2>

          {error && (
            <div className="mb-6 text-red-300 text-sm text-center bg-red-500/20 p-3 rounded-lg border border-red-400/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black/50 focus:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black/50 focus:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all duration-200 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-600/50"
            >
              Login
            </button>

            <p className="text-sm mt-6 text-center text-white/90">
              Don't have an account?{" "}
              <span
                className="text-red-300 cursor-pointer font-semibold hover:text-red-400 transition-colors duration-200"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;