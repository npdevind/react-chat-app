import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const signUp = async ({
    fullName,
    username,
    password,
    conPassword,
    gender,
  }) => {
    const success = handelError({
      fullName,
      username,
      password,
      conPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          conPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) throw Error(data.error);
      else {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};

export default useSignup;

const handelError = ({ fullName, username, password, conPassword, gender }) => {
  if (!fullName || !username || !password || !conPassword || !gender) {
    toast.error("All fields are require");
    return false;
  }

  if (password != conPassword) {
    toast.error("Confirm password not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must have 6 characters");
    return false;
  }
  return true;
};
