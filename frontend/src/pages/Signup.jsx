import React, { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null); // Track errors
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    const { firstName, lastName, username, password } = formData; // Destructure the form data

    // Email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Clear previous errors
    setError(null);
    setLoading(true);

    // Trim the email to remove any potential whitespace
    const trimmedEmail = username.trim();

    // Email Validation
    const isValidEmail = emailRegex.test(trimmedEmail);

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Password Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: trimmedEmail, // Use trimmed email for signup
        firstName: firstName,
        lastName: lastName,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response
          ? err.response.data.errors?.map((e) => e.message).join(", ")
          : "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col justify-center w-full max-w-md">
        <div className="rounded-lg bg-white shadow-2xl text-center p-8">
          <Heading label={"Sign up"} />
          <SubHeading label={"Create an account to get started"} />

          <div className="space-y-6">
            <InputBox
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              label={"First Name"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputBox
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              label={"Last Name"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
                onClick={handleSignup}
                label={loading ? "Signing up..." : "Sign up"}
                disabled={loading || !formData.firstName || !formData.lastName || !formData.username || !formData.password}
                className={`w-full py-2 rounded-lg transition-all duration-300 ${
                  loading || !formData.firstName || !formData.lastName || !formData.username || !formData.password
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              />
            </div>
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
            className="mt-6 text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;