import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ArrowRight, ShieldCheck, Clock, CheckCircle2, Building, Users, Utensils } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Online Food Donation Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI-Based Online Food Donation Platform
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            An online food donation platform that bridges the gap between surplus food providers, non-governmental organizations (NGOs), and community volunteers to ensure food reaches people in need safely and promptly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                <span>Access Login Portal</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Register New Account
              </Button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 max-w-xl mx-auto flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe Food Redistribution</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Time & Freshness Tracking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Coordinated Pickup Workflow</span>
            </div>
          </div>
        </div>
      </section>

      {/* How the Platform Works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">How the Platform Works</h2>
          <p className="mt-1 text-sm text-slate-600">
            The core workflow connecting donors, verified NGOs, and volunteer logistics:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-slate-200 text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Donor Lists Food</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Donors input food details, quantity, prep time, expiry limits, and pickup address into the platform.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">NGO Requests Donation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nearby registered NGOs browse verified available food listings and submit a claim or request based on capacity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Acceptance & Logistics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The donor approves the request, locking in pickup timing and volunteer transit coordination.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm mb-3">
              4
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Pickup & Handover</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Volunteers collect the food package and deliver it to the designated community kitchen or shelter.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Roles Section */}
      <section id="roles" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Platform User Roles</h2>
          <p className="mt-1 text-sm text-slate-600">
            Dedicated portal interfaces tailored for each key stakeholder in the donation chain:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Donor Role Card */}
          <Card className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Food Donor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Individuals, restaurants, event caterers, supermarkets, and corporate cafeterias wishing to donate excess edible food.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Quick food donation listing</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>AI Freshness prediction indicator preview</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Real-time status tracking (Available, Requested, Accepted)</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link to="/donor">
                <Button variant="outline" size="sm" fullWidth>
                  Explore Donor Portal
                </Button>
              </Link>
            </div>
          </Card>

          {/* NGO Role Card */}
          <Card className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">NGO / Organization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered non-profits, soup kitchens, orphanages, and community shelters serving meals to disadvantaged communities.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Browse available food packages</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Review shelf-life and pickup locations</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Manage donation requests and claims</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link to="/ngo">
                <Button variant="outline" size="sm" fullWidth>
                  Explore NGO Portal
                </Button>
              </Link>
            </div>
          </Card>

          {/* Volunteer Role Card */}
          <Card className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Volunteer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Community members with transport capability who facilitate timely pickup and distribution of food parcels.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>View pickup and drop-off dispatches</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Manage transit status</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Direct community impact</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link to="/volunteer">
                <Button variant="outline" size="sm" fullWidth>
                  Explore Volunteer Portal
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Access Portal Bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            <span className="font-semibold text-slate-800">Ready to contribute? </span>
            <span>
              Sign in as a Donor to list excess food, or as an NGO to request food for community shelters.
            </span>
          </div>
          <Link to="/login" className="shrink-0 text-emerald-700 font-semibold hover:underline">
            Go to Login &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};
