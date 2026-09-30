import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Project Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="p-1 bg-emerald-600 rounded text-white">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <span>AI-Based Online Food Donation Platform</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Connecting food donors, NGOs, and volunteers to reduce hunger and minimize food wastage through timely distribution and intelligent freshness monitoring.
            </p>
            <p className="text-xs text-slate-500 font-mono">
              College Capstone Project • AI-Based Online Food Donation Platform
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition-colors">
                  Login Portal
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-emerald-400 transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="hover:text-emerald-400 transition-colors">
                  AI Chatbot & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Role Portals */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/donor" className="hover:text-emerald-400 transition-colors">
                  Donor Portal
                </Link>
              </li>
              <li>
                <Link to="/ngo" className="hover:text-emerald-400 transition-colors">
                  NGO Portal
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-emerald-400 transition-colors">
                  Volunteer Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} AI-Based Online Food Donation Platform. College Project Showcase.</p>
          <p>Frontend Mockup (Non-persistent API stub)</p>
        </div>
      </div>
    </footer>
  );
};
