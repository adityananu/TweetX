import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useUserAuth } from "./context/AuthContext";
import None from "./pages/None";

function App() {
  const { user } = useUserAuth();

  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {user ? (
            <Route
              path="/home"
              element={
                  <Home />
              }
            />
          ) : (
            <Route path="/home" element={<None />} />
          )}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
