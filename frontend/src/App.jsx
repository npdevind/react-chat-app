import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/SignUp"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </>
  );
};

export default App;
