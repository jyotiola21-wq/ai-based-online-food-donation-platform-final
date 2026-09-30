import React from 'react';
import { DonationItem } from '../types';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Info,
  CheckCircle2,
  Package,
} from 'lucide-react';

interface DonationDetailModalProps {
  donation: DonationItem | null;
  isOpen: boolean;
  onClose: () => void;
  // Optional action for NGO or Donor
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  };
}

export const DonationDetailModal: React.FC<DonationDetailModalProps> = ({
  donation,
  isOpen,
  onClose,
  actionButton,
  secondaryAction,
}) => {
  if (!donation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Donation Package Details"
      maxWidth="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <div className="flex items-center gap-2">
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || 'outline'}
                size="sm"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
            {actionButton && (
              <Button
                variant={actionButton.variant || 'primary'}
                size="sm"
                onClick={actionButton.onClick}
                disabled={actionButton.disabled}
              >
                {actionButton.label}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-sm">
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <span className="text-xs text-slate-500 block uppercase font-semibold">
              Donation Ref: {donation.id}
            </span>
            <h4 className="text-base font-bold text-slate-900">{donation.foodName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                {donation.category}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Quantity: {donation.quantity}
              </span>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <Badge status={donation.status} size="md" />
          </div>
        </div>

        {/* Timing & Shelf Life */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-slate-200">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-500 font-medium">Prepared / Cooked</span>
              <p className="font-semibold text-slate-800 text-xs mt-0.5">
                {donation.preparationDateTime ? new Date(donation.preparationDateTime).toLocaleString() : 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-500 font-medium">Usable Until / Expiry</span>
              <p className="font-semibold text-amber-800 text-xs mt-0.5">
                {donation.expiryDateTime ? new Date(donation.expiryDateTime).toLocaleString() : 'Not specified'}
              </p>
            </div>
          </div>
        </div>

        {/* AI Freshness Prediction Section (UI Placeholder as requested) */}
        <div className="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Freshness Evaluation</span>
            </div>
            <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              Verified
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2 rounded border border-emerald-100">
              <span className="text-slate-500 text-[11px] block">Storage Environment</span>
              <span className="font-semibold text-slate-800">
                {donation.storageCondition || 'Room Temperature'}
              </span>
            </div>
            <div className="bg-white p-2 rounded border border-emerald-100">
              <span className="text-slate-500 text-[11px] block">Predicted Safe Consumption Window</span>
              <span className="font-semibold text-emerald-700">Optimal (Within 4-6 Hours)</span>
            </div>
          </div>
          {donation.freshnessNotes && (
            <p className="text-xs text-emerald-800 mt-1">
              <strong>Notes:</strong> {donation.freshnessNotes}
            </p>
          )}
          <p className="text-[11px] text-slate-500 italic">
            * AI Freshness prediction calculates quality metrics based on temperature, food category, and storage conditions.
          </p>
        </div>

        {/* Pickup Location & Contact */}
        <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2.5">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Pickup & Donor Logistics
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 font-medium">Pickup Address:</span>
                <p className="text-slate-800 font-medium mt-0.5">{donation.pickupAddress}</p>
                <p className="text-slate-500">
                  {donation.pickupCity}
                  {donation.pickupLandmark ? ` (Landmark: ${donation.pickupLandmark})` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 font-medium">Contact Coordinator:</span>
                <p className="text-slate-800 font-medium mt-0.5">{donation.contactPerson}</p>
                <p className="text-slate-600 font-mono">{donation.contactPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Description & Handling */}
        {donation.description && (
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Additional Details & Dietary Notes
            </span>
            <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
              {donation.description}
            </p>
          </div>
        )}

        {/* Status Tracker & NGO Claims */}
        {donation.status !== 'available' && (
          <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-sky-900">
              <Info className="w-3.5 h-3.5" />
              <span>Request / Assignment Information</span>
            </div>
            {donation.requestedByNgoName && (
              <p className="text-sky-800">
                <strong>Requested by:</strong> {donation.requestedByNgoName}
              </p>
            )}
            {donation.requestNotes && (
              <p className="text-sky-800">
                <strong>Request Notes:</strong> {donation.requestNotes}
              </p>
            )}
            {donation.acceptedAt && (
              <p className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accepted by donor on {new Date(donation.acceptedAt).toLocaleDateString()}</span>
              </p>
            )}
            {donation.completedAt && (
              <p className="text-slate-600 flex items-center gap-1">
                <Package className="w-3.5 h-3.5" />
                <span>Marked completed on {new Date(donation.completedAt).toLocaleDateString()}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
