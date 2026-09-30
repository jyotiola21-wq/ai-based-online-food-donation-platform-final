import React, { useState } from 'react';
import { useDonations } from '../../context/DonationContext';
import { DonationItem } from '../../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { DonationDetailModal } from '../../components/DonationDetailModal';
import { Truck, MapPin, Phone, Clock, Eye, CheckCircle2 } from 'lucide-react';

export const VolunteerDeliveries: React.FC = () => {
  const { donations, completeDonation } = useDonations();
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  const deliveries = donations.filter(
    (d) => d.status === 'accepted' || d.status === 'completed'
  );

  const handleMarkDelivered = (id: string) => {
    completeDonation(id);
    if (selectedDonation?.id === id) {
      setSelectedDonation(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Available Deliveries & Pickups
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Coordinate the collection from food donors and direct delivery to recipient NGO community kitchens.
        </p>
      </div>

      {deliveries.length === 0 ? (
        <Card>
          <EmptyState
            title="No deliveries available."
            description="There are currently no active deliveries in progress or scheduled for collection. Once a donor accepts an NGO's food claim, delivery tasks will be shown here."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveries.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Task: {item.id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{item.foodName}</h3>
                  </div>
                  <Badge status={item.status} size="sm" />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {item.category}
                  </span>
                  <span className="bg-purple-50 text-purple-800 font-semibold px-2 py-0.5 rounded">
                    Qty: {item.quantity}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Pickup Origin:</span>
                      <p className="text-slate-800">{item.pickupAddress}, {item.pickupCity}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Donor Contact:</span>
                      <p className="text-slate-800">{item.contactPerson} ({item.contactPhone})</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Truck className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Drop-off Destination:</span>
                      <p className="text-purple-900 font-medium">
                        {item.requestedByNgoName || 'Designated Partner Shelter'}
                      </p>
                    </div>
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

                {item.status === 'accepted' ? (
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 text-white"
                    onClick={() => handleMarkDelivered(item.id)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Handover</span>
                  </Button>
                ) : (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Delivery Completed</span>
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <DonationDetailModal
        donation={selectedDonation}
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
      />
    </div>
  );
};
