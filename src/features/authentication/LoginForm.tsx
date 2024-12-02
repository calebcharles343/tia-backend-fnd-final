import { FormEvent, useState } from "react";
import { login } from "../../services/apiAuth";
import Cookies from "js-cookie";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorLogin("");

    try {
      const { email, password } = formData;
      const response = await login(email, password);

      if (response?.data?.token) {
        Cookies.set("jwt", response.data.token, { expires: 7 });
        navigate("/home");
      } else {
        setErrorLogin(response?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorLogin("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 
    sm:gap-6 
    md:gap-8 
    lg:gap-10"
    >
      <div
        className="flex flex-col w-full max-w-sm border rounded-md px-4 py-6 
           bg-[rgba(255,255,255,0.1)] backdrop-blur-[6.2px] 
           border-[rgba(255,153,40,1)] text-gray-700 font-medium gap-4 shadow-xl 
           sm:max-w-md sm:px-6 sm:py-8 
           md:max-w-lg md:px-8 md:py-10"
      >
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            className="w-full h-10 px-3 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none 
             sm:h-10 sm:px-4 
             md:h-10 md:px-5 
             lg:h-10 lg:px-6"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            className="w-full h-10 px-3 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none 
             sm:h-10 sm:px-4 
             md:h-10 md:px-5 
             lg:h-10 lg:px-6"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {errorLogin && (
          <span className="text-center text-red-500" aria-live="polite">
            {errorLogin}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-20 flex justify-center items-center bg-gray-800 text-white px-3 py-2 rounded-md shadow-md"
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : "Login"}
      </button>
    </form>
  );
}
