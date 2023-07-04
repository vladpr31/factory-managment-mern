import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./Components/LoginPage/LoginPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="user/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
