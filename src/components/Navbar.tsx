import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartHandshake, Menu, X, User as UserIcon, LogOut, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as 'donor' | 'ngo' | 'volunteer';
    switchRole(newRole);
    navigate(`/${newRole}`);
  };

  const getDashboardPath = () => {
    if (!currentUser) return '/';
    return `/${currentUser.role}`;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
            className="flex items-center gap-2.5 text-emerald-700 font-bold text-lg hover:text-emerald-800 transition-colors"
          >
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <span className="leading-tight text-slate-900">
              FoodShare <span className="text-emerald-600 font-semibold text-sm block sm:inline">AI Platform</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
              className={`hover:text-emerald-600 transition-colors ${isActive('/') && !location.hash ? 'text-emerald-600 font-semibold' : ''}`}
            >
              Home
            </Link>
            <a
              href="#how-it-works"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  const el = document.getElementById('how-it-works');
                  if (el) {
                    const headerOffset = 80;
                    const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }
              }}
              className="hover:text-emerald-600 transition-colors"
            >
              How It Works
            </a>
            <Link
              to="/chatbot"
              className={`flex items-center gap-1.5 hover:text-emerald-600 transition-colors ${
                isActive('/chatbot') ? 'text-emerald-600 font-semibold' : ''
              }`}
            >
              <span>AI Chatbot</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                Help
              </span>
            </Link>

            {currentUser && (
              <Link
                to={getDashboardPath()}
                className={`hover:text-emerald-600 transition-colors font-medium text-emerald-700 ${
                  location.pathname.startsWith('/donor') ||
                  location.pathname.startsWith('/ngo') ||
                  location.pathname.startsWith('/volunteer')
                    ? 'font-bold underline underline-offset-4'
                    : ''
                }`}
              >
                {currentUser.role.toUpperCase()} Dashboard
              </Link>
            )}
          </nav>

          {/* User Auth / Quick Action Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800 truncate max-w-[120px]">{currentUser.name}</span>
                </div>
                <div className="border-l border-slate-200 pl-2">
                  <select
                    value={currentUser.role}
                    onChange={handleRoleChange}
                    aria-label="Switch Active Role"
                    className="text-xs bg-white border border-slate-200 rounded px-1.5 py-1 text-slate-700 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    title="Switch active role for demonstration"
                  >
                    <option value="donor">Donor Mode</option>
                    <option value="ngo">NGO Mode</option>
                    <option value="volunteer">Volunteer Mode</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="text-xs text-slate-500 hover:text-red-600 p-1 transition-colors"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <Link
            to="/"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-600"
          >
            Home
          </Link>
          <a
            href="#how-it-works"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (location.pathname === '/') {
                e.preventDefault();
                const el = document.getElementById('how-it-works');
                if (el) {
                  const headerOffset = 80;
                  const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }
            }}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-600"
          >
            How It Works
          </a>
          <Link
            to="/chatbot"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-600"
          >
            AI Chatbot & FAQs
          </Link>
          <a
            href="/#roles"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-600"
          >
            Platform Roles
          </a>

          {currentUser ? (
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="text-sm text-slate-600">
                Signed in as <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.role})
              </div>
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-emerald-700 font-semibold"
              >
                <span>Go to {currentUser.role.toUpperCase()} Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500">Switch Role:</label>
                <select
                  value={currentUser.role}
                  onChange={(e) => {
                    handleRoleChange(e);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs bg-slate-50 border border-slate-300 rounded px-2 py-1"
                >
                  <option value="donor">Donor</option>
                  <option value="ngo">NGO</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" fullWidth>
                  Log In
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" fullWidth>
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
