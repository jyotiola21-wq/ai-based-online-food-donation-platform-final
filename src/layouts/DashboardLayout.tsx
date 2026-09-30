import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDonations } from '../context/DonationContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  UserCheck,
  Building2,
  HandHeart,
  Truck,
  RotateCcw,
  CheckCircle2,
  ListOrdered,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DashboardLayout: React.FC = () => {
  const { currentUser, switchRole } = useAuth();
  const { clearAllDonations, donations } = useDonations();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  // Determine current active section role from path or currentUser
  const currentPathRole = location.pathname.startsWith('/donor')
    ? 'donor'
    : location.pathname.startsWith('/ngo')
    ? 'ngo'
    : location.pathname.startsWith('/volunteer')
    ? 'volunteer'
    : currentUser?.role || 'donor';

  const donorLinks: NavItem[] = [
    { name: 'Dashboard Overview', path: '/donor', icon: LayoutDashboard },
    { name: 'Add Food Donation', path: '/donor/add', icon: PlusCircle },
    { name: 'My Donations', path: '/donor/donations', icon: Package },
    { name: 'Profile', path: '/donor/profile', icon: UserCheck },
    { name: 'AI Chatbot & Help', path: '/chatbot', icon: HandHeart },
  ];

  const ngoLinks: NavItem[] = [
    { name: 'Dashboard Overview', path: '/ngo', icon: LayoutDashboard },
    { name: 'Available Food Donations', path: '/ngo/available', icon: HandHeart },
    { name: 'My Requests', path: '/ngo/requests', icon: ListOrdered },
    { name: 'Accepted Donations', path: '/ngo/accepted', icon: CheckCircle2 },
    { name: 'Profile', path: '/ngo/profile', icon: Building2 },
    { name: 'AI Chatbot & Help', path: '/chatbot', icon: RotateCcw },
  ];

  const volunteerLinks: NavItem[] = [
    { name: 'Dashboard Overview', path: '/volunteer', icon: LayoutDashboard },
    { name: 'Available Deliveries', path: '/volunteer/deliveries', icon: Truck },
    { name: 'Profile', path: '/volunteer/profile', icon: UserCheck },
    { name: 'AI Chatbot & Help', path: '/chatbot', icon: RotateCcw },
  ];

  const activeLinks =
    currentPathRole === 'donor'
      ? donorLinks
      : currentPathRole === 'ngo'
      ? ngoLinks
      : volunteerLinks;

  const roleLabels: Record<string, { label: string; badge: string; color: string }> = {
    donor: { label: 'Food Donor Portal', badge: 'Donor', color: 'emerald' },
    ngo: { label: 'NGO Partner Portal', badge: 'NGO', color: 'sky' },
    volunteer: { label: 'Volunteer Portal', badge: 'Volunteer', color: 'purple' },
  };

  const handleRoleSwitch = (role: 'donor' | 'ngo' | 'volunteer') => {
    switchRole(role);
    navigate(`/${role}`);
    setMobileSidebarOpen(false);
  };

  const handleClear = () => {
    clearAllDonations();
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      <Navbar />

      {/* Role Switcher & Presentation Testing Banner */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-slate-800">College Demo Switcher:</span>
            <span>Switch roles to test both sides of the food donation workflow:</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-md shadow-xs bg-slate-100 p-0.5 border border-slate-200">
              <button
                type="button"
                onClick={() => handleRoleSwitch('donor')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  currentPathRole === 'donor'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Donor View
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('ngo')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  currentPathRole === 'ngo'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NGO View
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('volunteer')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  currentPathRole === 'volunteer'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Volunteer View
              </button>
            </div>

            {donations.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                title="Clears all manually added test donations back to default empty state"
                className="flex items-center gap-1 text-slate-500 hover:text-red-600 bg-white border border-slate-200 px-2 py-1 rounded text-xs transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Empty State</span>
              </button>
            )}
          </div>
        </div>
        {resetMessage && (
          <div className="max-w-7xl mx-auto mt-1 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
            All entered donations cleared. Demonstrating empty states.
          </div>
        )}
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Sidebar Toggle Button */}
          <div className="lg:hidden flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <span className="font-semibold text-slate-800 text-sm">
              {roleLabels[currentPathRole]?.label}
            </span>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 rounded-md text-slate-700 hover:bg-slate-200"
            >
              {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{mobileSidebarOpen ? 'Close Menu' : 'Menu'}</span>
            </button>
          </div>

          {/* Desktop & Mobile Sidebar */}
          <aside
            className={`lg:w-64 shrink-0 ${
              mobileSidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden sticky top-20">
              <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Active Section
                </span>
                <div className="mt-1 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">
                    {roleLabels[currentPathRole]?.label}
                  </h2>
                </div>
              </div>

              <nav className="p-2 space-y-1">
                {activeLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === `/${currentPathRole}`}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-800 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
                <p className="font-medium text-slate-700">Food Donation Network</p>
                <p className="mt-0.5">Role-based dashboard for donors, NGOs, and volunteers.</p>
              </div>
            </div>
          </aside>

          {/* Dashboard Main Content Area */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
