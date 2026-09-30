import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonations } from '../../context/DonationContext';
import { DonationItem, DonationStatus } from '../../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { DonationDetailModal } from '../../components/DonationDetailModal';
import {
  PlusCircle,
  Eye,
  Check,
  CheckCheck,
  Calendar,
  MapPin,
  Clock,
  Package,
} from 'lucide-react';

type FilterTab = 'all' | 'available' | 'requested' | 'accepted' | 'completed';

export const MyDonations: React.FC = () => {
  const { donations, acceptDonation, completeDonation } = useDonations();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  const availableItems = donations.filter((d) => d.status === 'available');
  const requestedItems = donations.filter((d) => d.status === 'requested');
  const acceptedItems = donations.filter((d) => d.status === 'accepted');
  const completedItems = donations.filter((d) => d.status === 'completed');

  const filteredItems = donations.filter((d) => {
    if (activeTab === 'all') return true;
    return d.status === activeTab;
  });

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'available':
        return {
          title: 'No donations available yet.',
          description: 'You do not have any active donations waiting for NGO claims.',
        };
      case 'requested':
        return {
          title: 'No requests found.',
          description: 'No NGOs have currently requested food parcels from your listings.',
        };
      case 'accepted':
        return {
          title: 'No accepted donations.',
          description: 'There are no active donations currently accepted for pickup.',
        };
      case 'completed':
        return {
          title: 'No completed donations.',
          description: 'No donations have completed the final delivery process yet.',
        };
      default:
        return {
          title: 'No donations found.',
          description: 'You have not created any food donation listings yet.',
        };
    }
  };

  const handleAccept = (donationId: string) => {
    acceptDonation(donationId);
    if (selectedDonation && selectedDonation.id === donationId) {
      setSelectedDonation({
        ...selectedDonation,
        status: 'accepted',
        acceptedAt: new Date().toISOString(),
      });
    }
  };

  const handleComplete = (donationId: string) => {
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
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Donations</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Review and track all your food donation listings across each stage of distribution.
          </p>
        </div>
        <Link to="/donor/add">
          <Button size="sm" className="flex items-center gap-1.5 shadow-xs">
            <PlusCircle className="w-4 h-4" />
            <span>Add New Donation</span>
          </Button>
        </Link>
      </div>

      {/* Tabs for Available, Requested, Accepted, Completed */}
      <div className="border-b border-slate-200 bg-white px-4 rounded-t-lg border-t border-x overflow-x-auto">
        <nav className="flex space-x-6 min-w-max" aria-label="Donation Status Tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'all'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>All Donations</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[11px]">
              {donations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('available')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'available'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Available</span>
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[11px]">
              {availableItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('requested')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'requested'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Requested</span>
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-[11px]">
              {requestedItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('accepted')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'accepted'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Accepted</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full text-[11px]">
              {acceptedItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`py-3.5 px-1 border-b-2 text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'completed'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span>Completed</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[11px]">
              {completedItems.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Donations Content Area */}
      {filteredItems.length === 0 ? (
        <Card className="rounded-t-none border-t-0">
          <EmptyState
            title={getEmptyStateMessage().title}
            description={getEmptyStateMessage().description}
            actionText="Add Food Donation"
            onAction={() => window.location.assign('/donor/add')}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
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
                  <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                    Qty: {item.quantity}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>
                      Usable Until: {item.expiryDateTime ? new Date(item.expiryDateTime).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {item.pickupAddress}, {item.pickupCity}
                    </span>
                  </div>
                </div>

                {item.status === 'requested' && item.requestedByNgoName && (
                  <div className="p-2.5 bg-amber-50 rounded-md border border-amber-200 text-xs text-amber-800">
                    <p className="font-semibold">
                      Claimed by NGO: {item.requestedByNgoName}
                    </p>
                    {item.requestNotes && (
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        Notes: {item.requestNotes}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
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

                {item.status === 'requested' && (
                  <Button
                    size="sm"
                    onClick={() => handleAccept(item.id)}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Request</span>
                  </Button>
                )}

                {item.status === 'accepted' && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleComplete(item.id)}
                    className="flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </Button>
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
          selectedDonation?.status === 'requested'
            ? {
                label: 'Accept Request',
                onClick: () => {
                  if (selectedDonation) handleAccept(selectedDonation.id);
                },
              }
            : selectedDonation?.status === 'accepted'
            ? {
                label: 'Mark as Completed',
                onClick: () => {
                  if (selectedDonation) handleComplete(selectedDonation.id);
                },
                variant: 'secondary',
              }
            : undefined
        }
      />
    </div>
  );
};
