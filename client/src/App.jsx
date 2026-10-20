import { AuthProvider } from "./context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Discovery from "./components/Discovery";
import FeaturedSUVs from "./components/FeaturedSUVs";
import SUVExplorer from "./components/SUVExplorer";
import SUVCompare from "./components/SUVCompare";
import Ownership from "./components/Ownership";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function HomePage() {
  return (
    <div className="app-shell">
      <Navbar />

      <main id="home">
        <Hero />
        <Discovery />
        <SUVExplorer />
        <FeaturedSUVs />
        <SUVCompare />
        <Ownership />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
