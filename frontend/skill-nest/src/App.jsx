import { Navigate, Route, Routes } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";

// Onboarding
import OnBoarding from "./pages/Onboarding/Onboarding";
import Skills from "./pages/Onboarding/Skills";
import Interest from "./pages/Onboarding/Interest";
import Budget from "./pages/Onboarding/Budget";
import Location from "./pages/Onboarding/Location";

// Learner
import LearnerDashboard from "./pages/Learner/Dashboard";
import BusinessIdea from "./pages/Learner/BusinessIdea";
import Ideas from "./pages/Learner/Ideas";
import MyProgress from "./pages/Learner/MyProgress";
import MyMentor from "./pages/Learner/Mymentor";
import Resources from "./pages/Learner/Resources";
import Roadmap from "./pages/Learner/Roadmap";
import Settings from "./pages/Learner/Settings";

// Mentor
import MentorDashboard from "./pages/MentorDashboard";

// Admin
import AdminLayout from "./pages/admin/adminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMentors from "./pages/admin/AdminMentors";
import AdminBusinessIdea from "./pages/admin/AdminBusinessIdea";
import AdminCreateRoadmap from "./pages/admin/AdminCreateRoadmap";
import AdminRoadmaps from "./pages/admin/AdminRoadmaps";
import AdminResources from "./pages/admin/AdminResources";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReport from "./pages/admin/AdminReport";
import AdminProfile from "./pages/admin/AdminProfile";
import CreateBusinessIdea from "./pages/admin/CreateBusinessIdea";

// Protection
import ProtectedRoute from "./components/ProtectedRoute";
import AdminEditRoadmap from "./pages/admin/AdminEditRoadmap";
import AdminLearners from "./pages/admin/AdminLearners";
import AdminLearnerDetails from "./pages/admin/AdminLearnerDetails";
import AdminBusinessIdeaDetails from "./pages/admin/AdminBusinessIdeaDetails";

function App() {
  return (
    <Routes>
      {/* ==================== PUBLIC ==================== */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<SignIn />} />

      <Route path="/signup" element={<SignUp />} />

      {/* ==================== ONBOARDING ==================== */}

      <Route element={<ProtectedRoute allowedRoles={["learner"]} />}>
        <Route path="/onboarding" element={<OnBoarding />} />

        <Route path="/onboarding/skills" element={<Skills />} />

        <Route path="/onboarding/interests" element={<Interest />} />

        <Route path="/onboarding/budget" element={<Budget />} />

        <Route path="/onboarding/location" element={<Location />} />
      </Route>

      {/* ==================== LEARNER ==================== */}

      <Route element={<ProtectedRoute allowedRoles={["learner"]} />}>
        <Route
          path="/learner"
          element={<Navigate to="/learner/dashboard" replace />}
        />

        <Route path="/learner/dashboard" element={<LearnerDashboard />} />

        <Route path="/learner/business-ideas" element={<BusinessIdea />} />

        <Route path="/learner/business-idea" element={<BusinessIdea />} />

        <Route path="/learner/ideas" element={<Ideas />} />

        <Route path="/learner/my-roadmap" element={<Roadmap />} />

        <Route path="/learner/resources" element={<Resources />} />

        <Route path="/learner/find-mentors" element={<MyMentor />} />

        <Route path="/learner/my-progress" element={<MyProgress />} />

        <Route path="/learner/settings" element={<Settings />} />
      </Route>

      {/* ==================== MENTOR ==================== */}

      <Route element={<ProtectedRoute allowedRoles={["mentor"]} />}>
        <Route path="/mentor" element={<MentorDashboard />} />

        <Route path="/mentor/dashboard" element={<MentorDashboard />} />

        <Route path="/mentor/my-mentees" element={<MentorDashboard />} />

        <Route path="/mentor/sessions" element={<MentorDashboard />} />

        <Route path="/mentor/resources" element={<MentorDashboard />} />

        <Route path="/mentor/q&a" element={<MentorDashboard />} />

        <Route path="/mentor/analytics" element={<MentorDashboard />} />

        <Route path="/mentor/settings" element={<MentorDashboard />} />
      </Route>

      {/* ==================== ADMIN ==================== */}

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="mentors" element={<AdminMentors />} />

          <Route path="business-ideas" element={<AdminBusinessIdea />} />

          <Route
            path="business-ideas/create"
            element={<CreateBusinessIdea />}
          />

          <Route path="roadmaps" element={<AdminRoadmaps />} />

          <Route path="roadmaps/create" element={<AdminCreateRoadmap />} />

          <Route
            path="/admin/roadmaps/:roadmapId/edit"
            element={<AdminEditRoadmap />}
          />

          <Route path="resources" element={<AdminResources />} />

          <Route path="users" element={<AdminUsers />} />

          <Route path="reports" element={<AdminReport />} />

          <Route path="profile" element={<AdminProfile />} />

          <Route path="/admin/learners" element={<AdminLearners />} />

          <Route
            path="/admin/learners/:learnerId"
            element={<AdminLearnerDetails />}
          />

          <Route
    path="/admin/business-ideas/:ideaId"
    element={<AdminBusinessIdeaDetails />}
/>
        </Route>
      </Route>

      {/* ==================== FALLBACK ==================== */}

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
