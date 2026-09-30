import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDonations } from '../../context/DonationContext';
import { DonationItem } from '../../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { DonationDetailModal } from '../../components/DonationDetailModal';
import {
  PlusCircle,
  Package,
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  Eye,
  Info,
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { donations } = useDonations();
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  // Filter donations created by this donor or all donations for this demo
  const myDonations = donations;
  const availableCount = myDonations.filter((d) => d.status === 'available').length;
  const requestedCount = myDonations.filter((d) => d.status === 'requested').length;
  const acceptedCount = myDonations.filter((d) => d.status === 'accepted').length;
  const completedCount = myDonations.filter((d) => d.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Donor Dashboard
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Welcome back, {currentUser?.name || 'Food Donor'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your surplus food donations, review NGO requests, and track distributions.
          </p>
        </div>
        <div className="shrink-0">
          <Link to="/donor/add">
            <Button size="md" className="flex items-center gap-1.5 shadow-xs">
              <PlusCircle className="w-4 h-4" />
              <span>Add Food Donation</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Summary Cards (No fake metrics - uses real count from client state) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Available Listings</span>
            <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{availableCount}</div>
          <span className="text-[11px] text-slate-500">Open for NGO requests</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Requests</span>
            <div className="p-1.5 bg-amber-100 text-amber-700 rounded">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{requestedCount}</div>
          <span className="text-[11px] text-slate-500">Awaiting your approval</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Accepted & Active</span>
            <div className="p-1.5 bg-sky-100 text-sky-700 rounded">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{acceptedCount}</div>
          <span className="text-[11px] text-slate-500">In pickup logistics</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed Donations</span>
            <div className="p-1.5 bg-slate-100 text-slate-700 rounded">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{completedCount}</div>
          <span className="text-[11px] text-slate-500">Successfully delivered</span>
        </Card>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/donor/add" className="group">
          <div className="bg-white p-5 rounded-lg border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs h-full flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-700">
                Add Food Donation
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Post surplus cooked meals, packaged groceries, or bakery items with pickup details.
              </p>
            </div>
            <span className="text-xs font-medium text-emerald-600 mt-3 block">
              Open Form &rarr;
            </span>
          </div>
        </Link>

        <Link to="/donor/donations" className="group">
          <div className="bg-white p-5 rounded-lg border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs h-full flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-sky-700">
                My Donations
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Track statuses: Available, Requested, Accepted, and Completed donations.
              </p>
            </div>
            <span className="text-xs font-medium text-sky-600 mt-3 block">
              View All ({myDonations.length}) &rarr;
            </span>
          </div>
        </Link>

        <Link to="/donor/profile" className="group">
          <div className="bg-white p-5 rounded-lg border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs h-full flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-slate-900">
                Donor Profile
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Review your registered donor details, default address, and contact information.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-700 mt-3 block">
              Edit Profile &rarr;
            </span>
          </div>
        </Link>
      </div>

      {/* Recent Donations List / Empty State */}
      <Card
        title="Recent Food Donations"
        subtitle="Surplus food items listed from your account"
        action={
          <Link to="/donor/donations">
            <Button variant="ghost" size="sm">
              View All Donations
            </Button>
          </Link>
        }
      >
        {myDonations.length === 0 ? (
          <EmptyState
            title="No donations available yet."
            description="You haven't listed any surplus food items yet. Create your first donation listing to make it available for local NGOs."
            actionText="Add Food Donation Now"
            onAction={() => window.location.assign('/donor/add')}
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {myDonations.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-md transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{item.foodName}</span>
                    <Badge status={item.status} size="sm" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Qty: {item.quantity}</span>
                    <span>•</span>
                    <span>Category: {item.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.pickupCity}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDonation(item)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Donation Details Modal */}
      <DonationDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
      />
    </div>
  );
};
