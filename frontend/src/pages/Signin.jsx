import React, { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { username, password } = formData;
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message || "Invalid credentials"
          : "Signin failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white shadow-2xl w-96 text-center p-8">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <form onSubmit={handleSignin} className="space-y-6">
            <InputBox
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="johndoe@gmail.com"
              label={"Email"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <InputBox
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="123456"
              label={"Password"}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && (
              <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                label={loading ? "Signing in..." : "Sign in"}
                disabled={loading || !formData.username || !formData.password}
                className={`w-full py-2 rounded-lg transition-all duration-300 ${
                  loading || !formData.username || !formData.password
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              />
            </div>
          </form>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
            className="mt-6 text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;