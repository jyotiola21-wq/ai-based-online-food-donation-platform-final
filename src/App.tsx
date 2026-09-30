import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DonationProvider } from './context/DonationContext';
import { ScrollToTop } from './components/ScrollToTop';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ChatbotPage } from './pages/ChatbotPage';

// Donor Pages
import { DonorDashboard } from './pages/donor/DonorDashboard';
import { AddDonation } from './pages/donor/AddDonation';
import { MyDonations } from './pages/donor/MyDonations';
import { DonorProfile } from './pages/donor/DonorProfile';

// NGO Pages
import { NgoDashboard } from './pages/ngo/NgoDashboard';
import { AvailableDonations } from './pages/ngo/AvailableDonations';
import { MyRequests } from './pages/ngo/MyRequests';
import { AcceptedDonations } from './pages/ngo/AcceptedDonations';
import { NgoProfile } from './pages/ngo/NgoProfile';

// Volunteer Pages
import { VolunteerDashboard } from './pages/volunteer/VolunteerDashboard';
import { VolunteerDeliveries } from './pages/volunteer/VolunteerDeliveries';
import { VolunteerProfile } from './pages/volunteer/VolunteerProfile';

export default function App() {
  return (
    <AuthProvider>
      <DonationProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
            </Route>

            {/* Donor Portal Routes */}
            <Route path="/donor" element={<DashboardLayout />}>
              <Route index element={<DonorDashboard />} />
              <Route path="add" element={<AddDonation />} />
              <Route path="donations" element={<MyDonations />} />
              <Route path="profile" element={<DonorProfile />} />
            </Route>

            {/* NGO Portal Routes */}
            <Route path="/ngo" element={<DashboardLayout />}>
              <Route index element={<NgoDashboard />} />
              <Route path="available" element={<AvailableDonations />} />
              <Route path="requests" element={<MyRequests />} />
              <Route path="accepted" element={<AcceptedDonations />} />
              <Route path="profile" element={<NgoProfile />} />
            </Route>

            {/* Volunteer Portal Routes */}
            <Route path="/volunteer" element={<DashboardLayout />}>
              <Route index element={<VolunteerDashboard />} />
              <Route path="deliveries" element={<VolunteerDeliveries />} />
              <Route path="profile" element={<VolunteerProfile />} />
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DonationProvider>
    </AuthProvider>
  );
}
