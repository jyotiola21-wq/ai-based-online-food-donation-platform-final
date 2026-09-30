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
  HandHeart,
  ListOrdered,
  CheckCircle2,
  Building2,
  Eye,
  MapPin,
  Clock,
  Send,
} from 'lucide-react';

export const NgoDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { donations, requestDonation } = useDonations();
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);
  const [requestNotes, setRequestNotes] = useState('');
  const [showRequestConfirm, setShowRequestConfirm] = useState(false);

  const availableDonations = donations.filter((d) => d.status === 'available');
  const myRequests = donations.filter((d) => d.status === 'requested');
  const acceptedDonations = donations.filter((d) => d.status === 'accepted');
  const completedDonations = donations.filter((d) => d.status === 'completed');

  const handleRequestSubmit = () => {
    if (!selectedDonation) return;
    requestDonation(
      selectedDonation.id,
      currentUser?.id || 'ngo_demo',
      currentUser?.organizationName || currentUser?.name || 'Care Relief NGO',
      requestNotes
    );
    setShowRequestConfirm(false);
    setSelectedDonation(null);
    setRequestNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            NGO Partner Portal
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Welcome, {currentUser?.organizationName || currentUser?.name || 'NGO Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Explore surplus food listings from local donors, submit claim requests, and coordinate pickups for shelters.
          </p>
        </div>
        <div className="shrink-0">
          <Link to="/ngo/available">
            <Button size="md" className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700">
              <HandHeart className="w-4 h-4" />
              <span>Browse Available Food</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Available to Request</span>
            <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded">
              <HandHeart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{availableDonations.length}</div>
          <span className="text-[11px] text-slate-500">Listed by donors</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Requests</span>
            <div className="p-1.5 bg-amber-100 text-amber-700 rounded">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{myRequests.length}</div>
          <span className="text-[11px] text-slate-500">Awaiting donor confirmation</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Accepted Pickups</span>
            <div className="p-1.5 bg-sky-100 text-sky-700 rounded">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{acceptedDonations.length}</div>
          <span className="text-[11px] text-slate-500">Ready for collection</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed Deliveries</span>
            <div className="p-1.5 bg-slate-100 text-slate-700 rounded">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{completedDonations.length}</div>
          <span className="text-[11px] text-slate-500">Delivered to beneficiaries</span>
        </Card>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/ngo/available" className="group">
          <div className="bg-white p-5 rounded-lg border border-slate-200 hover:border-sky-500 transition-colors shadow-xs h-full flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
                <HandHeart className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-sky-700">
                Available Food Donations
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Browse freshly listed donations with quantity and usable expiry information.
              </p>
            </div>
            <span className="text-xs font-medium text-sky-600 mt-3 block">
              Browse Listings ({availableDonations.length}) &rarr;
            </span>
          </div>
        </Link>

        <Link to="/ngo/requests" className="group">
          <div className="bg-white p-5 rounded-lg border border-slate-200 hover:border-sky-500 transition-colors shadow-xs h-full flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <ListOrdered className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-amber-700">
                My Requests
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Track status across Pending, Accepted, and Completed requests.
              </p>
            </div>
            <span className="text-xs font-medium text-amber-600 mt-3 block">
              Track Requests &rarr;
            </span>
          </div>
        </Link>

        <Link to="/ngo/profile" className="group">
          <div className="bg-white p-5 rounded-lg border border-slate-200 hover:border-sky-500 transition-colors shadow-xs h-full flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-slate-900">
                NGO Profile
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Review verified NGO registration ID, representative details, and operating areas.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-700 mt-3 block">
              View Profile &rarr;
            </span>
          </div>
        </Link>
      </div>

      {/* Available Donations Quick Feed */}
      <Card
        title="Recently Available Food Donations"
        subtitle="Donations currently waiting for NGO requests"
        action={
          <Link to="/ngo/available">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        }
      >
        {availableDonations.length === 0 ? (
          <EmptyState
            title="No donations available yet."
            description="There are currently no active food donations waiting for requests. Check back soon or switch to Donor View to list a donation."
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {availableDonations.slice(0, 5).map((item) => (
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
                    <span className="font-medium text-slate-700">Quantity: {item.quantity}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.pickupCity}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-700 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      Exp: {item.expiryDateTime ? new Date(item.expiryDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
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
                  <Button
                    size="sm"
                    className="bg-sky-600 hover:bg-sky-700 flex items-center gap-1"
                    onClick={() => {
                      setSelectedDonation(item);
                      setShowRequestConfirm(true);
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Food</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Donation Detail Modal */}
      <DonationDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation && !showRequestConfirm}
        onClose={() => setSelectedDonation(null)}
        actionButton={
          selectedDonation?.status === 'available'
            ? {
                label: 'Request This Donation',
                onClick: () => setShowRequestConfirm(true),
                variant: 'primary',
              }
            : undefined
        }
      />

      {/* Request Confirmation Dialog */}
      {showRequestConfirm && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Request Donation: {selectedDonation.foodName}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Confirm your request for <strong>{selectedDonation.quantity}</strong> of{' '}
              {selectedDonation.foodName}. The donor will be notified to confirm and coordinate pickup.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Estimated Pickup Time / Notes for Donor (Optional):
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Can pick up within 1 hour with our refrigerated volunteer van."
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowRequestConfirm(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-sky-600 hover:bg-sky-700"
                onClick={handleRequestSubmit}
              >
                Confirm & Submit Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
