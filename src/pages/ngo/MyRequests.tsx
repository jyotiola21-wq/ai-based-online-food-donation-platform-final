import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonations } from '../../context/DonationContext';
import { DonationItem } from '../../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { DonationDetailModal } from '../../components/DonationDetailModal';
import {
  ListOrdered,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  HandHeart,
  Phone,
} from 'lucide-react';

type RequestFilter = 'all' | 'pending' | 'accepted' | 'completed';

export const MyRequests: React.FC = () => {
  const { donations, completeDonation } = useDonations();
  const [activeTab, setActiveTab] = useState<RequestFilter>('all');
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  // Donations that have been requested by NGOs (status !== 'available')
  const allNgoRequests = donations.filter((d) => d.status !== 'available');

  const pendingRequests = allNgoRequests.filter((d) => d.status === 'requested');
  const acceptedRequests = allNgoRequests.filter((d) => d.status === 'accepted');
  const completedRequests = allNgoRequests.filter((d) => d.status === 'completed');

  const filteredRequests = allNgoRequests.filter((d) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return d.status === 'requested';
    if (activeTab === 'accepted') return d.status === 'accepted';
    if (activeTab === 'completed') return d.status === 'completed';
    return true;
  });

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'pending':
        return {
          title: 'No pending requests.',
          description: 'You do not have any donation claims currently waiting for donor confirmation.',
        };
      case 'accepted':
        return {
          title: 'No accepted donations found.',
          description: 'No active donations have been accepted for pickup yet.',
        };
      case 'completed':
        return {
          title: 'No completed donations.',
          description: 'No donations have completed the distribution process yet.',
        };
      default:
        return {
          title: 'No requests found.',
          description: 'You have not submitted any claims for food donations yet. Browse available donations to request food.',
        };
    }
  };

  const handleMarkCompleted = (donationId: string) => {
    completeDonation(donationId);
    if (selectedDonation && selectedDonation.id === donationId) {
      setSelectedDonation({
        ...selectedDonation,
        status: 'completed',
        completedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Requests</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track the status of all food claims submitted by your organization.
          </p>
        </div>
        <Link to="/ngo/available">
          <Button size="sm" className="bg-sky-600 hover:bg-sky-700 flex items-center gap-1.5">
            <HandHeart className="w-4 h-4" />
            <span>Browse More Donations</span>
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white px-4 rounded-t-lg border-t border-x overflow-x-auto">
        <nav className="flex space-x-6 min-w-max" aria-label="Requests Filter Tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'all'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>All Requests</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[11px]">
              {allNgoRequests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Pending Donor Approval</span>
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-[11px]">
              {pendingRequests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('accepted')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'accepted'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Accepted for Pickup</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full text-[11px]">
              {acceptedRequests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'completed'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Completed</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[11px]">
              {completedRequests.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <Card className="rounded-t-none border-t-0">
          <EmptyState
            title={getEmptyStateMessage().title}
            description={getEmptyStateMessage().description}
            actionText="Find Available Food"
            onAction={() => window.location.assign('/ngo/available')}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Ref: {item.id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{item.foodName}</h3>
                  </div>
                  <Badge status={item.status} size="sm" />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {item.category}
                  </span>
                  <span className="bg-sky-50 text-sky-800 font-semibold px-2 py-0.5 rounded">
                    Quantity: {item.quantity}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {item.pickupAddress}, {item.pickupCity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Donor Coordinator: {item.contactPerson} ({item.contactPhone})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>
                      Usable Deadline: {item.expiryDateTime ? new Date(item.expiryDateTime).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>

                {item.requestNotes && (
                  <div className="p-2.5 bg-slate-50 rounded text-xs text-slate-700 border border-slate-200">
                    <span className="font-semibold block text-[11px] text-slate-500 uppercase">
                      Your Request Note:
                    </span>
                    <p className="mt-0.5">{item.requestNotes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDonation(item)}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Button>

                {item.status === 'accepted' && (
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 text-white"
                    onClick={() => handleMarkCompleted(item.id)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Received & Distributed</span>
                  </Button>
                )}

                {item.status === 'requested' && (
                  <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Awaiting Donor Approval</span>
                  </span>
                )}

                {item.status === 'completed' && (
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Completed & Handed Over</span>
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Donation Detail Modal */}
      <DonationDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        actionButton={
          selectedDonation?.status === 'accepted'
            ? {
                label: 'Confirm Food Received',
                onClick: () => {
                  if (selectedDonation) handleMarkCompleted(selectedDonation.id);
                },
              }
            : undefined
        }
      />
    </div>
  );
};
