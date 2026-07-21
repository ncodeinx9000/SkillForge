import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Budget from "./pages/Onboarding/Budget";
import Interest from "./pages/Onboarding/Interest";
import Location from "./pages/Onboarding/Location";
import OnBoarding from "./pages/Onboarding/Onboarding";
import Skills from "./pages/Onboarding/Skills";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Learner from "./pages/Dashboard/Learner";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/learner" element={<Learner />} />
      {/* Onboarding */}
      <Route path="/onboarding" element={<OnBoarding />} />
      <Route path="/onboarding/skills" element={<Skills />} />
      <Route path="/onboarding/interests" element={<Interest />} />
      <Route path="/onboarding/budget" element={<Budget />} />
      <Route path="/onboarding/location" element={<Location />} />
    </Routes>
  );
}

export default App;
