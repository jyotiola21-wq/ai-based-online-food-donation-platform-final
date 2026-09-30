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
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  Eye,
  Truck,
  CheckCheck,
} from 'lucide-react';

export const AcceptedDonations: React.FC = () => {
  const { donations, completeDonation } = useDonations();
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  const acceptedList = donations.filter((d) => d.status === 'accepted');

  const handleComplete = (id: string) => {
    completeDonation(id);
    if (selectedDonation?.id === id) {
      setSelectedDonation(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Accepted Food Donations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Donations accepted by the donor and cleared for volunteer dispatch, pickup, and shelter distribution.
          </p>
        </div>
      </div>

      {acceptedList.length === 0 ? (
        <Card>
          <EmptyState
            title="No accepted donations."
            description="There are currently no donations in accepted status ready for pickup. When donors accept your requests, they will appear here."
            actionText="View My Requests"
            onAction={() => window.location.assign('/ngo/requests')}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {acceptedList.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      ID: {item.id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{item.foodName}</h3>
                  </div>
                  <Badge status="accepted" size="sm" />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {item.category}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                    Quantity: {item.quantity}
                  </span>
                </div>

                {/* Pickup Instructions */}
                <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700 block">Pickup Address:</span>
                      <p className="text-slate-800 font-medium">{item.pickupAddress}, {item.pickupCity}</p>
                      {item.pickupLandmark && <p className="text-slate-500">Landmark: {item.pickupLandmark}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700 block">Donor Contact:</span>
                      <p className="text-slate-800">{item.contactPerson} ({item.contactPhone})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-amber-800">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Usable Deadline: {item.expiryDateTime ? new Date(item.expiryDateTime).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>
              </div>

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
                  className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 text-white"
                  onClick={() => handleComplete(item.id)}
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark as Completed</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <DonationDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        actionButton={{
          label: 'Mark as Completed',
          onClick: () => {
            if (selectedDonation) handleComplete(selectedDonation.id);
          },
        }}
      />
    </div>
  );
};
