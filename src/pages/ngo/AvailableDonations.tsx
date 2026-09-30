import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDonations } from '../../context/DonationContext';
import { DonationItem, FoodCategory } from '../../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { DonationDetailModal } from '../../components/DonationDetailModal';
import {
  HandHeart,
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
  Sparkles,
  Send,
  Eye,
  Info,
} from 'lucide-react';

export const AvailableDonations: React.FC = () => {
  const { currentUser } = useAuth();
  const { donations, requestDonation } = useDonations();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestNotes, setRequestNotes] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Filter only 'available' donations
  const availableList = donations.filter((d) => d.status === 'available');

  const filteredDonations = availableList.filter((item) => {
    const matchesSearch =
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pickupCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestSubmit = () => {
    if (!selectedDonation) return;

    requestDonation(
      selectedDonation.id,
      currentUser?.id || 'ngo_demo',
      currentUser?.organizationName || currentUser?.name || 'Care Relief NGO',
      requestNotes
    );

    setShowRequestDialog(false);
    setSelectedDonation(null);
    setRequestNotes('');
    setRequestSuccess(true);
    setTimeout(() => setRequestSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Available Food Donations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Browse food donations actively listed by community donors. Review shelf-life, quantity, and pickup location before requesting.
        </p>
      </div>

      {requestSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Donation requested successfully! Your claim has been sent to the donor for approval. You can track this in <strong>My Requests</strong>.
          </span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search food name, city, or pickup landmark..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs sm:text-sm rounded-md border border-slate-300 px-2.5 py-2 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="all">All Categories</option>
            <option value="Cooked Meals">Cooked Meals</option>
            <option value="Raw Groceries">Raw Groceries</option>
            <option value="Bakery Items">Bakery Items</option>
            <option value="Packaged Foods">Packaged Foods</option>
            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>
      </div>

      {/* Available List / Empty State */}
      {filteredDonations.length === 0 ? (
        <Card>
          <EmptyState
            title="No donations available yet."
            description={
              availableList.length === 0
                ? "There are currently no open food donations listed on the platform. When donors publish surplus food, they will appear here immediately."
                : "No available donations matched your search or category filter. Try clearing your filters."
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDonations.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      ID: {item.id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{item.foodName}</h3>
                  </div>
                  <Badge status={item.status} size="sm" />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-slate-100 text-slate-800 font-medium px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                    Quantity: {item.quantity}
                  </span>
                  {item.storageCondition && (
                    <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded text-[11px]">
                      {item.storageCondition}
                    </span>
                  )}
                </div>

                {/* Freshness and Shelf Life Info */}
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200/80 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Prepared: {item.preparationDateTime ? new Date(item.preparationDateTime).toLocaleDateString() + ' ' + new Date(item.preparationDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-800 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      Usable Until: {item.expiryDateTime ? new Date(item.expiryDateTime).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="text-xs text-slate-600 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800">{item.pickupAddress}</p>
                    <p className="text-slate-500">
                      {item.pickupCity}
                      {item.pickupLandmark ? ` • Landmark: ${item.pickupLandmark}` : ''}
                    </p>
                  </div>
                </div>

                {/* Description Preview */}
                {item.description && (
                  <p className="text-xs text-slate-600 line-clamp-2 italic bg-white p-2 rounded border border-slate-100">
                    "{item.description}"
                  </p>
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

                <Button
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700 flex items-center gap-1.5"
                  onClick={() => {
                    setSelectedDonation(item);
                    setShowRequestDialog(true);
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Donation</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Donation Detail Modal */}
      <DonationDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation && !showRequestDialog}
        onClose={() => setSelectedDonation(null)}
        actionButton={
          selectedDonation?.status === 'available'
            ? {
                label: 'Request This Donation',
                onClick: () => setShowRequestDialog(true),
              }
            : undefined
        }
      />

      {/* Request Dialog */}
      {showRequestDialog && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-slate-200 p-5 space-y-4">
            <div>
              <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                Confirm Claim Request
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {selectedDonation.foodName}
              </h3>
              <p className="text-xs text-slate-500">
                Quantity: {selectedDonation.quantity} • Location: {selectedDonation.pickupCity}
              </p>
            </div>

            <div className="p-3 bg-sky-50 rounded-md border border-sky-100 text-xs text-sky-900 space-y-1">
              <p className="font-semibold">Requester Organization:</p>
              <p>{currentUser?.organizationName || 'Registered NGO Partner'}</p>
              <p className="text-[11px] text-sky-700">
                The food donor will be prompted to approve your claim and prepare the parcel for pickup.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Pickup Timing & Distribution Plan (Optional):
              </label>
              <textarea
                rows={3}
                placeholder="e.g. We will dispatch our volunteer van by 3:00 PM for distribution at the Central Community Kitchen."
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
                  setShowRequestDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-sky-600 hover:bg-sky-700"
                onClick={handleRequestSubmit}
              >
                Submit Donation Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
