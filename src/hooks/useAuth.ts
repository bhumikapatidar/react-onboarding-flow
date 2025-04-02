import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/onboarding");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "user123" && password === "password123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/onboarding");
    } else {
      setError("Invalid username or password");
    }
  };

  return { username, setUsername, password, setPassword, error, handleLogin };
};

export default useAuth;
