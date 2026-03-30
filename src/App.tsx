import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import HelpSupport from "./pages/HelpSupport";
import Dashboard from "./pages/Dashboard";
import Ujian from "./pages/Ujian";
import Tasks from "./pages/Tasks";
import Stats from "./pages/Stats";
import Resources from "./pages/Resources";
import Finance from "./pages/Finance";
import SettingsPage from "./pages/SettingsPage";
import Notes from "./pages/Notes";
import Exams from "./pages/Exams";
import Schedule from "./pages/Schedule";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ujian" element={<Ujian />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="stats" element={<Stats />} />
            <Route path="resources" element={<Resources />} />
            <Route path="finance" element={<Finance />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notes" element={<Notes />} />
            <Route path="exams" element={<Exams />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="courses" element={<Courses />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
          {/* Legacy routes redirect */}
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/grades" element={<Navigate to="/app/ujian" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
