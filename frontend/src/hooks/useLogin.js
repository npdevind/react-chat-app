import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext();
  const login = async (username, password) => {
    const success = handelError({
      username,
      password,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) throw Error(data.error);
      localStorage.setItem("chatAppUserData", JSON.stringify(data.user));
      setAuthUser(data.user);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

const handelError = ({ username, password }) => {
  if (!username || !password) {
    toast.error("All fields are require");
    return false;
  }
  return true;
};
